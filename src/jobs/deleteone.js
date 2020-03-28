const dynamoDB = require("../dynamodb");

module.exports.handler = async (evt, cxt) => {
    const id = evt.pathParameters.id;

    try {
        await dynamoDB.delete({
            TableName: process.env.JOBS_TABLE,
            Key: {
                id: id
            }
        }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(`Job with id: ${id} has been deleted`)
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }

}