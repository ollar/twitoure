import Component from '@ember/component';
import GeoPattern from 'npm:geopattern';

import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['icon-image'],
  classNameBindings: ['data.image:has-image'],

  name: computed('data.username', function() {
    return this.getWithDefault('data.username', 'anonymous');
  }),

  image: computed.readOnly('data.avatar.firstObject'),

  initials: computed('name', function() {
    if (!this.get('name')) return '';
    return this.get('name')
      .trim()
      .split(' ')
      .map(item => item[0].toUpperCase())
      .slice(0, 2)
      .join('');
  }),

  backgroundImage: computed('name', function() {
    if (!this.get('name')) return '';
    return GeoPattern.generate(this.get('name')).toDataUrl();
  }),

  // rewrite this
  updateStyles() {
    this.$().css({
      backgroundImage: this.get('backgroundImage'),
      height: this._size,
      width: this._size,
      lineHeight: this._size + 'px',
    });
  },

  didRender() {
    this._super(...arguments);
    this.updateStyles();
  },
});
