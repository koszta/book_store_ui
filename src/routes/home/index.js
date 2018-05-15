import { h, Component } from 'preact';
import { request } from 'graphql-request';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

const endpoint = 'http://localhost:4000/graphql';
const query = `{
	books {
		id
		title
		author
		description
		price
	}
}`;

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { books: [] };
	}
	async componentWillMount() {
		const { books } = await request(endpoint, query);

		this.setState({
			books
		});
	}
	books() {
		return this.state.books.map(book =>
			<Card key={book.id}>
				<div class={style.cardHeader}>
					<h2 class=" mdc-typography--title">{book.title}</h2>
					<div class=" mdc-typography--caption">{book.author}</div>
				</div>
				<div class={style.cardBody}>
					{book.description}
				</div>
				<Card.Actions>
					<Card.ActionButton>BUY IT NOW for ${book.price}!</Card.ActionButton>
				</Card.Actions>
			</Card>
		)
	}
	render() {
		return (
			<div class={style.home}>
				<h1>Best sellers</h1>
				{this.books()}
			</div>
		);
	}
}
