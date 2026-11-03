/**
 * Puti Classroom Realtime Engine
 * Zero-server, cross-device MQTT-over-WebSocket realtime sync.
 * Enables live mobile student voting & buzzers to project instantly on the smartboard.
 */

class ClassroomRealtimeEngine {
  constructor() {
    this.room = this.getOrCreateRoomId();
    this.client = null;
    this.connected = false;
    this.connecting = false;
    this.listeners = {};
    this.pendingSubscriptions = new Set();
    this.currentBrokerIndex = 0;
    this.reconnectTimer = null;

    // High availability public TLS MQTT brokers list
    this.brokers = [
      { host: 'broker.emqx.io', port: 8084, path: '/mqtt' },
      { host: 'broker.hivemq.com', port: 8884, path: '/mqtt' }
    ];

    this.broadcastChannelPoll = new BroadcastChannel('puti_classroom_poll_' + this.room);
    this.broadcastChannelBuzzer = new BroadcastChannel('puti_classroom_buzzer_' + this.room);

    this.initBroadcastFallback();
    this.initMqtt();
  }

  getOrCreateRoomId() {
    let room = localStorage.getItem('puti_classroom_room');
    if (!room) {
      room = 'C' + Math.floor(10000 + Math.random() * 90000);
      localStorage.setItem('puti_classroom_room', room);
    }
    return room;
  }

  initMqtt() {
    if (typeof Paho === 'undefined') {
      console.warn('[RealtimeEngine] Paho MQTT not loaded, relying on BroadcastChannel fallback.');
      return;
    }

    if (this.connecting || (this.client && this.connected)) {
      return;
    }

    this.connecting = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    const broker = this.brokers[this.currentBrokerIndex % this.brokers.length];
    const clientId = 'puti_host_' + Math.random().toString(16).substring(2, 10);

    try {
      if (this.client) {
        try { this.client.disconnect(); } catch (e) {}
      }

      this.client = new Paho.MQTT.Client(broker.host, broker.port, broker.path, clientId);

      this.client.onConnectionLost = (responseObject) => {
        this.connected = false;
        this.connecting = false;
        if (responseObject.errorCode !== 0) {
          console.warn(`[RealtimeEngine] Connection lost from ${broker.host}:`, responseObject.errorMessage);
          this.currentBrokerIndex++;
          this.scheduleReconnect(3000);
        }
      };

      this.client.onMessageArrived = (message) => {
        try {
          const topic = message.destinationName;
          const payload = JSON.parse(message.payloadString);
          this.dispatch(topic, payload);
        } catch (err) {
          console.error('[RealtimeEngine] MQTT parse error:', err);
        }
      };

      const options = {
        useSSL: true,
        timeout: 5,
        keepAliveInterval: 30,
        cleanSession: true,
        onSuccess: () => {
          this.connected = true;
          this.connecting = false;
          console.log(`[RealtimeEngine] Connected to MQTT Broker (${broker.host}). Room: ${this.room}`);

          // Default smartboard subscriptions
          this.client.subscribe(`puti/class/${this.room}/poll/vote`);
          this.client.subscribe(`puti/class/${this.room}/poll/req`);
          this.client.subscribe(`puti/class/${this.room}/buzzer/buzz`);

          // Resubscribe any registered widget listeners
          this.pendingSubscriptions.forEach(topicSuffix => {
            this.client.subscribe(`puti/class/${this.room}/${topicSuffix}`);
          });
        },
        onFailure: (err) => {
          this.connected = false;
          this.connecting = false;
          console.warn(`[RealtimeEngine] Connection failed to ${broker.host}, switching broker...`, err);
          this.currentBrokerIndex++;
          this.scheduleReconnect(3500);
        }
      };

      this.client.connect(options);
    } catch (e) {
      this.connected = false;
      this.connecting = false;
      console.warn('[RealtimeEngine] MQTT init error:', e);
      this.currentBrokerIndex++;
      this.scheduleReconnect(3500);
    }
  }

  scheduleReconnect(delayMs) {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.initMqtt();
    }, delayMs);
  }

  initBroadcastFallback() {
    this.broadcastChannelPoll.onmessage = (e) => {
      this.dispatch(`puti/class/${this.room}/poll/vote`, e.data);
      if (e.data.type === 'REQUEST_POLL_STATE') {
        this.dispatch(`puti/class/${this.room}/poll/req`, e.data);
      }
    };
    this.broadcastChannelBuzzer.onmessage = (e) => {
      this.dispatch(`puti/class/${this.room}/buzzer/buzz`, e.data);
    };
  }

  subscribe(topicSuffix, callback) {
    const fullTopic = `puti/class/${this.room}/${topicSuffix}`;
    if (!this.listeners[fullTopic]) {
      this.listeners[fullTopic] = [];
    }
    this.listeners[fullTopic].push(callback);
    this.pendingSubscriptions.add(topicSuffix);

    if (this.client && this.connected) {
      try {
        this.client.subscribe(fullTopic);
      } catch (e) {}
    }
  }

  dispatch(topic, data) {
    if (this.listeners[topic]) {
      this.listeners[topic].forEach(cb => {
        try { cb(data); } catch (e) { console.error('Callback error:', e); }
      });
    }
  }

  publish(topicSuffix, data, retained = false) {
    const fullTopic = `puti/class/${this.room}/${topicSuffix}`;
    const payloadStr = JSON.stringify(data);

    // Send via MQTT if connected
    if (this.client && this.connected) {
      try {
        const message = new Paho.MQTT.Message(payloadStr);
        message.destinationName = fullTopic;
        if (retained) {
          message.retained = true;
        }
        this.client.send(message);
      } catch (err) {
        console.warn('MQTT publish failed:', err);
      }
    }

    // Also send via local BroadcastChannel
    if (topicSuffix.includes('poll')) {
      this.broadcastChannelPoll.postMessage(data);
    } else if (topicSuffix.includes('buzzer')) {
      this.broadcastChannelBuzzer.postMessage(data);
    }
  }
}

window.realtimeEngine = new ClassroomRealtimeEngine();
