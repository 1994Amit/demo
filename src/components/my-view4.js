/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { increment, decrement } from '../actions/counter.js';

// We are lazy loading its reducer.
import counter from '../reducers/counter.js';
store.addReducers({
  counter
});

// These are the elements needed by this element.
import './counter-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyView4 extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      // This is the data from the store.
      _clicks: { type: Number },
      _value: { type: Number }
    };
  }

  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
      <section>
        <h2>SHINIGAMI</h2>
        <div class="circle">${this._value}</div>
        <p>You will be dead in 5 min.</p>
		
        <iframe src="http://172.21.2.8:5601/app/kibana#/dashboard/ea552160-1a8d-11ea-8af4-8f6c87500025?embed=true&_g=()&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(colors:('23+-+30':%233F6833),defaultColors:('0+-+8':'rgb(247,252,245)','15+-+23':'rgb(11,19,11)','23+-+30':'rgb(35,139,69)','8+-+15':'rgb(199,233,192)'),title:'Ambient+Temperature',vis:(colors:('23+-+30':%23629E51),defaultColors:('0+-+8':'rgb(247,252,245)','15+-+23':'rgb(116,196,118)','23+-+30':'rgb(35,139,69)','8+-+15':'rgb(199,233,192)'))),gridData:(h:10,i:'9ebae041-0b41-472d-9c32-7dcbb3d61a6b',w:32,x:0,y:0),id:'87a0a4e0-1b05-11ea-8d27-3916ab1ca3bb',panelIndex:'9ebae041-0b41-472d-9c32-7dcbb3d61a6b',title:'Ambient+Temperature',type:visualization,version:'7.4.2'),(embeddableConfig:(title:Area),gridData:(h:7,i:'2f42f126-cb7c-4dd0-9c88-db418379a774',w:12,x:35,y:0),id:dbecc630-1b07-11ea-8d27-3916ab1ca3bb,panelIndex:'2f42f126-cb7c-4dd0-9c88-db418379a774',title:Area,type:visualization,version:'7.4.2'),(embeddableConfig:(title:'Active+Power'),gridData:(h:9,i:'496238ec-7dde-48ce-8807-754d7d9927b2',w:25,x:0,y:10),id:cc7d8230-1a98-11ea-8af4-8f6c87500025,panelIndex:'496238ec-7dde-48ce-8807-754d7d9927b2',title:'Active+Power',type:visualization,version:'7.4.2'),(embeddableConfig:(title:Yield),gridData:(h:9,i:'5f3d19a9-a813-4258-872d-a1c706d8f4d0',w:23,x:25,y:10),id:'0ee19540-1b06-11ea-8d27-3916ab1ca3bb',panelIndex:'5f3d19a9-a813-4258-872d-a1c706d8f4d0',title:Yield,type:visualization,version:'7.4.2')),query:(language:kuery,query:''),timeRestore:!f,title:'solar+dashboard',viewMode:view)" height="600" width="5000"></iframe></section>
      <section>
        <p>
          <counter-element
              value="${this._value}"
              clicks="${this._clicks}"
              @counter-incremented="${this._counterIncremented}"
              @counter-decremented="${this._counterDecremented}">
          </counter-element>
        </p>
      </section>
    `;
  }

  _counterIncremented() {
    store.dispatch(increment());
  }

  _counterDecremented() {
    store.dispatch(decrement());
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {
    this._clicks = state.counter.clicks;
    this._value = state.counter.value;
  }
}

window.customElements.define('my-view4', MyView4);
