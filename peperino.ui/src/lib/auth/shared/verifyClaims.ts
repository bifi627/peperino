
export type ClaimRequest = string | { key: string, value: any }

export const verifyClaims = (existingClaims: Record<string, any>, ...claimRequests: ClaimRequest[]) => {
    for (const claimRequest of claimRequests) {
        // Single claim needs just to be assinged with any value
        if (typeof (claimRequest) === "string") {
            if (existingClaims[claimRequest] === undefined) {
                return false;
            }
        }
        else {
            const existingClaim = existingClaims[claimRequest.key];
            if (existingClaim === undefined || existingClaim !== claimRequest.value) {
                return false;
            }
        }
    }
    return true;
}