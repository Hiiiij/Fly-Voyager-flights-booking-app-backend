import { VercelRequest, VercelResponse } from '@vercel/node';

export const allowedParameters = ['date', 'status', 'iata']; 

export const queryParser = (query: Record<string, any>, allowedParameters: string[]) => {
    let filter: Record<string, any> = {};
    for (const key in query) {
        if (allowedParameters.includes(key)) {
            filter = { ...filter, [key]: query[key] };
        } else {
            console.warn(`Disallowed query parameter: ${key}`);
        }
    }
    return filter;
}

export const paginationHelper = (query: Record<string, any>) => {
    const page = parseInt(query.page as string) || 1;
    const limit = Math.min(parseInt(query.limit as string) || 10, 100); 
    const skip = (page - 1) * limit;
    const cursor = query.cursor || null; 
    return { page, limit, skip, cursor };
};


export const sortHelper = (query: Record<string, any>, allowedSortFields: string[]) => {
    const sortField = query.sort && allowedSortFields.includes(query.sort.replace('-', '')) 
        ? query.sort 
        : '-createdAt';
    const sortOrder = sortField.startsWith('-') ? -1 : 1;
    const actualSortField = sortField.replace('-', '');
    return { [actualSortField]: sortOrder };
};

export const asyncHandler = (fn: (req: VercelRequest, res: VercelResponse) => Promise<any>) => {
    return (req: VercelRequest, res: VercelResponse) => {
        Promise.resolve(fn(req, res)).catch(error => errorHandler(res, error));
    };
};

function errorHandler(res: VercelResponse, error: any): void {
    console.error('Error occurred:', error);
    res.status(500).json({
        message: 'Internal Server Error',
        error: error.message || 'An unexpected error occurred',
    });
}


