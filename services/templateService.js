/**
 * Created by pritam on 25/9/16.
 */
var getChangeListTemplate = function () {
    return "{{#each this}}<span style=\"font-family: monospace; font-weight: bold\">Uploads For {{@key}} </span><ul> {{#each this}} <li style = \"font-family: monospace; \"> <span>{{changeLog}}</span> <span>({{adName}})</span><span> [{{uploadHr}}]</span></li> {{/each}}</ul>{{/each}}";
};
var getUserUploadChangesTemplate = function () {
    return "<ul> {{#each changes}} <li style = \"font-family: monospace; \"> {{this}}</li> {{/each}}</ul>";
};
var templateService = {
    getChangeListTemplate: getChangeListTemplate,
    getUserUploadChangesTemplate: getUserUploadChangesTemplate
};
module.exports = templateService;