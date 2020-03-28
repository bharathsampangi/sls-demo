module.exports.handler = (event, context) => {
    console.log(context);
    return {
        statusCode: '200',
        body: JSON.stringify({
            name: "Nodejs dev",
            event
        })
    }
}