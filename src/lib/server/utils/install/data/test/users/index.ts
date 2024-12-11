import us from '$lib/server/utils/install/data/test/users/us.json';
import br from '$lib/server/utils/install/data/test/users/br.json';
import { type Create as CreatePerson } from '$lib/schema/people/people';
import { type SupportedCountry, SUPPORTED_COUNTRIES, SUPPORTED_LANGUAGES } from '$lib/i18n';
export default function generateSamplePeople({
	instanceId,
	adminPointPersonId,
	type
}: {
	instanceId: number;
	adminPointPersonId: number;
	type: SupportedCountry; //can only be US for this...
}): CreatePerson[] {
	if (type !== 'us') throw new Error('Invalid country type'); //right now our test users are all US located...
	const rawUsers = us.results;
	const users = rawUsers.map((user, i) => {
		return {
			full_name: `${user.name.first} ${user.name.last}`,
			given_name: user.name.first,
			family_name: user.name.last,
			preferred_language: SUPPORTED_LANGUAGES[SUPPORTED_LANGUAGES.indexOf('en')],
			address_line_1: user.location.street.number + ' ' + user.location.street.name,
			postcode: user.location.postcode.toString(),
			locality: user.location.city,
			state: user.location.state,
			country: SUPPORTED_COUNTRIES[SUPPORTED_COUNTRIES.indexOf('us')],
			email: {
				email: user.email,
				subscribed: true,
				contactable: true,
				verified: true
			}
			//phone numbers are tricky because our parsing library doesn't allow fakies
			/* phone_number: {
        phone_number: `+1${us[i].cell.replace(/[\s()-]/g, "")}`,
        contactable: true,
        textable: true,
        country: "us",
      }, */
			//point_person_id: adminPointPersonId //don't need this because we add an admin_id when creating
		};
	});

	return users;
}
