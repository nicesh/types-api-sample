import {
	Param, Body, Get, Post, Put, Delete, NotFoundError, BadRequestError, JsonController
} from "routing-controllers";
import {UserRepository} from "../repository/UserRepository";
import {User} from '../model/User';

@JsonController()
export class UserController {

	private userRepository: UserRepository;

	constructor() {
		this.userRepository = new UserRepository();
	}

	@Get("/users")
	getAll() {
		return this.userRepository.findAll();
	}

	@Get("/users/:id")
	getOne(@Param("id") id: number) {
		if(id < 1 || isNaN(id)) {
			throw new NotFoundError('Invalid user Id.');
		}

		const result = this.userRepository.findOne(id);
		if(!result) {
			throw new NotFoundError('User was not found.');
		}
		return result;
	}

	@Post("/users")
	post(@Body({required: true}) user: User) {
		if(!user.name) {
			throw new BadRequestError('User name is required.');
		}
		if(!user.phone) {
			throw new BadRequestError('User phone is required.');
		}
		if(!user.email) {
			throw new BadRequestError('User email is required.');
		}

		return this.userRepository.save(user);
	}

	@Put("/users/:id")
	put(@Param("id") id: number, @Body({required: true}) user: User) {
		if(id < 1 || isNaN(id)) {
			throw new NotFoundError('Invalid user Id.');
		}

		const result = this.userRepository.update(id, user);
		if(!result) {
			throw new NotFoundError('User was not found.');
		}

		return result;
	}

	@Delete("/users/:id")
	remove(@Param("id") id: number) {
		if(id < 1 || isNaN(id)) {
			throw new NotFoundError('Invalid user Id.');
		}

		const result = this.userRepository.remove(id);
		if(!result) {
			throw new NotFoundError('User was not found.');
		}

		return result;
	}

}