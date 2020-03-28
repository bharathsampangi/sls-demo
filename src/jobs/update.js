const dynamoDB = require("../dynamodb");
const Joi = require("@hapi/joi");

module.exports.handler = async (evt, cxt) => {
    const id = evt.pathParameters.id;
    const timestamp = new Date().getTime();
    const data = JSON.parse(evt.body);

    const schema = Joi.object({
        title: Joi.string().required(),
        published: Joi.boolean().required()
    });

    const { error } = schema.validate(data);

    if (error) {
        return {
            statusCode: 400,
            body: JSON.stringify(error)
        }
    }

    const params = {
        TableName: process.env.JOBS_TABLE,
        Key: {
            id
        },
        UpdateExpression: "SET title= :title, published= :published, updatedAt= :updatedAt",
        ExpressionAttributeValues: {
            ":title": data.title,
            ":published": data.published,
            ":updatedAt": timestamp
        },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const results = await dynamoDB.update(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(results)
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }

}