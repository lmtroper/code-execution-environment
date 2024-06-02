// utils.ts
import axios from 'axios';
import { AxiosError } from 'axios';

export async function runCode(code: string): Promise<string | AxiosError> {
  try {
    const response = await axios.post<{ output: string }>(
      'http://localhost:3001/runcode/',
      { code }
    );
    console.log(response.data.output);
    return response.data.output;
  } catch (error: any) {
    return error;
  }
}

export async function submitCode(code: string): Promise<boolean> {
  try {
    console.log('Sending code to the server for execution:');
    const response = await axios.post('http://localhost:3001/savecode/', {
      code,
    });

    // Check if the response status is 200 (OK)
    if (response.status === 200) {
      console.log('Code saved successfully');
      return true;
    } else {
      console.error('Failed to save code:', response.statusText);
      return false;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error:', error.response?.data);
      return false;
    } else {
      console.error('Unknown error:', error);
      return false;
    }
  }
}

interface Submission {
  id: number;
  code: string;
  output_code: string;
  created_at: string;
}

export async function fetchSubmissions(): Promise<Submission[] | undefined> {
  try {
    console.log('Fetching submissions from the server...');
    const response = await axios.get<Submission[]>(
      'http://localhost:3001/submissions/'
    );
    console.log('Submissions fetched successfully:', response.data);
    return response.data; // Directly return response.data if it’s an array of Submission objects
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching submissions:', error.response?.data);
      return undefined;
    } else {
      console.error('Unknown error:', error);
      return undefined;
    }
  }
}

export function formatDateString(dateString: string): string {
  // Create a Date object from the provided date string
  const date = new Date(dateString);

  // Adjust the time zone offset
  const timezoneOffsetInMs = date.getTimezoneOffset() * 60000;
  date.setTime(date.getTime() - timezoneOffsetInMs);

  // Define months array for converting numeric month to text
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Extract individual date components
  const year: number = date.getFullYear();
  const month: string = months[date.getMonth()];
  const day: number = date.getDate();
  let hours: number = date.getHours();
  const minutes: number = date.getMinutes();

  // Determine if it's AM or PM and adjust hours accordingly
  const ampm: string = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  // Format the time string with leading zero for single digit minutes
  const time: string = `${hours}:${minutes < 10 ? '0' + minutes : minutes}${ampm}`;

  // Construct the final formatted date string
  const formattedDate: string = `${month} ${day} ${year} ${time}`;

  return formattedDate;
}
