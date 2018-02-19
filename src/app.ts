import "reflect-metadata";
import {createExpressServer} from "routing-controllers";

createExpressServer({
	controllers: [__dirname + "/controllers/**/*.js"],
	middlewares: [__dirname + "/middlewares/**/*.js"],
	defaultErrorHandler: false

}).listen(3000, () => console.log('This app listening on port 3000!'));