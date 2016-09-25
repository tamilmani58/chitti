/**
 * Created by pritam on 25/9/16.
 */
    var getChangeListTemplate = function () {
    return "{{#each this}}<span>Uploads For {{@key}} </span><ul> {{#each this}} <li style = \"font-family: monospace; line-height: 2px\"> <span>{{changeLog}}</span> <span>({{adName}})</span><span> [{{uploadHr}}]</span></li> {{/each}}</ul>{{/each}}";
};
var templateService = {
    getChangeListTemplate: getChangeListTemplate
};
module.exports = templateService;