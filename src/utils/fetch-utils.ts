export class FetchUtils {
	static async post<T>(body: T, uuid: string): Promise<T> {
		return (
			await fetch(`http://localhost:3002/visits/${uuid}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(body)
			})
		).json();
	}
}
