import axios from 'axios'
import React from 'react';

export default class TransportLayer extends React.Component {
    constructor(props) {
        super(props);
        this.client = axios.create();
        this.client.interceptors.request.use((cfg) => {
            cfg.baseURL = `${window.location.origin}/api`
            return cfg;
        });
    }

    static get instance() {
        if (!this._instance) {
            this._instance = new TransportLayer();
        }
        return this._instance;
    }

    getMessage = async () => {
        let response = await this.client.get('/');
        return response.data;
    }
}