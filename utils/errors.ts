export class ValidationError extends Error {
}

export const handleError = (err, req, res, next) => {
    res.status(err instanceof ValidationError ? 400 : 500)
    res.render('error', {
        message: err instanceof ValidationError ? err.message : 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie za kilka minut.'
    })
}
