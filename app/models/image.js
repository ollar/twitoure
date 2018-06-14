import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    url: DS.attr('string'),
    type: DS.attr('string'),
    name: DS.attr('string'),
    size: DS.attr('number'),
    width: DS.attr('number'),
    height: DS.attr('number'),

    created: DS.attr('number'),

    base64: computed(() => ''),
});
