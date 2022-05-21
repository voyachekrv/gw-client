export class FetchUtils {
	static async post<T>(body: T): Promise<T> {
		return (
			await fetch(
				'http://localhost:3002/visits/94e11ef5-9357-4ee9-963a-b3ef03b40822',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: JSON.stringify(body)
				}
			)
		).json();
	}
}
