import {Middleware, ExpressErrorMiddlewareInterface} from "routing-controllers";

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

	error(error: any, request: any, response: any, next: (err: any) => any) {
		console.error('**** error', error);

		if(error.httpCode) {
			response.status(error.httpCode).send({ errorMessage: error.message || error.name });
		} else {
			response.status(500).send({errorMessage: "Unexpected internal server error."});
		}

		next(null);
	}

}