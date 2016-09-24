/**
 * Created by pritam on 25/9/16.
 */
    var getChangeListTemplate = function () {
    return "{{#each this}}<span> {{@key}} </span><ul> {{#each this}} <li> {{changeLog}} {{email}} {{uploadHr}}</li> {{/each}}</ul>{{/each}}";
}
var templateService = {
    getChangeListTemplate: getChangeListTemplate
};
module.exports = templateService;