export class FetchUtils {
	static async post<T>(body: T): Promise<T> {
		return (
			await fetch('http://jsonplaceholder.typicode.com/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(body)
			})
		).json();
	}
}
