// utils.ts
import axios from 'axios';

export async function runCode(code: string): Promise<string | undefined> {
    try {
        console.log(
            'Sending code to the server for execution:',
            
        )
        const response = await axios.post<{ output: string }>('http://localhost:3001/runcode/', { code });
        console.log(response.data.output);
        return response.data.output;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error:', error.response?.data);
            return error.response?.data;
        } else {
            console.error('Unknown error:', error);
            return undefined;
        }
    }
}
