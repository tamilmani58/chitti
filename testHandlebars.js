/**
 * Created by pritam on 25/9/16.
 */
var handlebars = require('handlebars');
var changeLogTemplate = "{{#each data}}<span> {{date}} </span><ul> {{#each change}} <li> {{changeLog}} {{email}} {{uploadHr}}</li> {{/each}}</ul>{{/each}}";
var data = {
    "data": [
        {
            date: '2016-09-24',
            change: [
                {
                    changeLog: 'bug fix',
                    email: 'pritam.p@directi.com',
                    uploadHr: "15:15"

                }
            ]
        },
        {
            date: '2016-09-23',
            change: [
                {
                    changeLog: 'bug fix',
                    email: 'pritam.p@directi.com',
                    uploadHr: "15:15"

                },
                {
                    changeLog: 'small fix',
                    email: 'pritam.p@directi.com',
                    uploadHr: "16:16"

                }
            ]
        }
    ]
};
var compiledTemplate = handlebars.compile(changeLogTemplate);
console.log(compiledTemplate(data));
