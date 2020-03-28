const dynamoDB = require("../dynamodb");

module.exports.handler = async (evt, cxt) => {
    const body = JSON.parse(evt.body);
    const title = body.title;

    const params = {
        TableName: process.env.JOBS_TABLE,
        KeyConditionExpression: "title= :title",
        ExpressionAttributeValues: {
            ":title": title
        },
        ReturnValues: "ALL_NEW"
    }

    try {
        const results = await dynamoDB.query(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(results)
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }

}