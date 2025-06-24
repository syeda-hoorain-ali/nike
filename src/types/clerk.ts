export interface ClerkApiErrorResponse {
    errors: [{
        message: string;
        long_message: string;
        code: string;
        meta: object;
        clerk_trace_id: string;
    }];
    meta: object;
    clerk_trace_id: string;
}
