import {Middleware, ExpressMiddlewareInterface} from "routing-controllers";
import {Request, Response, NextFunction} from "express";

@Middleware({ type: "before" })
export class LoggingMiddleware implements ExpressMiddlewareInterface {

	use(request: Request, response: Response, next: NextFunction): void {
		console.log('***** request.method: ', request.method);
		console.log('***** request.path: ', request.path);
		console.log(request);
		next();
	}

}