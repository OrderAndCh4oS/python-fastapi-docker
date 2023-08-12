import {PutParameterCommand, SSMClient} from "@aws-sdk/client-ssm";

import {config} from "dotenv";
config({path: '.env'})

const ssmClient = new SSMClient({ region: 'eu-west-1' });

const parameters = [
    {
        Name: '/api/certificate-domain-name',
        Value: process.env.CERTIFICATE_DOMAIN_NAME,
        Type: 'String'
    },
    {
        Name: '/api/hosted-zone-id',
        Value: process.env.HOSTED_ZONE_ID,
        Type: 'String'
    },
    {
        Name: '/api/hosted-zone-name',
        Value: process.env.HOSTED_ZONE_NAME,
        Type: 'String'
    },
    {
        Name: '/api/a-record-name',
        Value: process.env.A_RECORD_NAME,
        Type: 'String'
    }
];

console.log(parameters);

async function createParameters(parameters) {
    for (const param of parameters) {
        try {
            const command = new PutParameterCommand({...param, Overwrite: true});
            await ssmClient.send(command);
            console.log(`Parameter created successfully: ${param.Name}`);
        } catch (err) {
            console.error(`Error creating parameter: ${param.Name}`, err);
        }
    }
}

await createParameters(parameters);
