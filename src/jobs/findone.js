const dynamoDB = require("../dynamodb");

module.exports.handler = async (event, context) => {
    const id = event.pathParameters.id;

    try {
        const result = await dynamoDB.get({
            TableName: process.env.JOBS_TABLE,
            Key: {
                id: id
            }
        }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }

}