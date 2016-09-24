/**
 * Created by pritam on 25/9/16.
 */
var handlebars = require('handlebars');
var moment = require('moment');
var changeLogTemplate = "{{#each this}}<span> {{@key}} </span><ul> {{#each this}} <li> {{changeLog}} {{email}} </li> {{/each}}</ul>{{/each}}";
var data = {
    "2016-09-22": [
        {
            changeLog: "BugFix",
            email: "pritam.p@directi.com"
    }
    ],
    "2016-09-23": [
        {
            changeLog: "BugFix",
            email: "pritam.p@directi.com"
        },
        {
            changeLog: "SmallFix",
            email: "pritam.p@directi.com"
        }
    ]
};
var compiledTemplate = handlebars.compile(changeLogTemplate);
console.log(compiledTemplate(data));
console.log(moment().format(""))
