export default function(appContext) {
	return appContext.passport.authenticate('jwt', { session: false});
}
