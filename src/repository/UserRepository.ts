import * as faker from 'faker';
import * as _ from 'lodash';
import {User} from '../model/User';

export class UserRepository {

	private users: User[] = [];

	constructor() {
		this.users.push(new User(1, faker.name.findName(), faker.internet.email(), faker.phone.phoneNumber()));
		this.users.push(new User(2, faker.name.findName(), faker.internet.email(), faker.phone.phoneNumber()));
		this.users.push(new User(3, faker.name.findName(), faker.internet.email(), faker.phone.phoneNumber()));
		this.users.push(new User(4, faker.name.findName(), faker.internet.email(), faker.phone.phoneNumber()));
	}

	private findNextId(): number {
		const ids = this.users.map(user => user.id).sort();
		if(ids.length === 0) {
			return 1;
		} else {
			return (ids[ids.length - 1] + 1);
		}
	}

	findAll(): User[] {
		return this.users;
	}

	findOne(id: number): User {
		return _.find(this.users, {id: id});
	}

	save(user: User): User {
		user.id = this.findNextId();
		this.users.push(user);
		return user;
	}

	update(id: number, user: User): User {
		const index = _.findIndex(this.users, {id: id});

		if(index > -1) {
			const findUser = this.users[index];

			if(user.name) {
				findUser.name = user.name;
			}
			if(user.email) {
				findUser.email = user.email;
			}
			if(user.phone) {
				findUser.phone = user.phone;
			}

			this.users.splice(index, 1, findUser);
			return findUser;

		} else {
			return null;
		}
	}

	remove(id: number): User {
		const index = _.findIndex(this.users, {id: id});

		if(index > -1) {
			return this.users.splice(index, 1)[0];
		} else {
			return null;
		}
	}

}