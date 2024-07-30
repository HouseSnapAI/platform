const { createClient } = require ("@supabase/supabase-js");


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
* Handler that will be called during the execution of a PostUserRegistration flow.
*
* @param {Event} event - Details about the context and user that has registered.
* @param {PostUserRegistrationAPI} api - Methods and utilities to help change the behavior after a signup.
*/

/**
 * Handler that will be called during the execution of a PostUserRegistration flow.
 *
 * @param {Event} event - Details about the context and user that has registered.
 * @param {PostUserRegistrationAPI} api - Methods and utilities to help change the behavior after a signup.
 */

//@ts-ignore
exports.onExecutePostUserRegistration = async (event, api) => {
    // Check if user already exists
    const { data: existingUser, error: fetchError } = await supabase
        .from('User')
        .select('*')
        .eq('email', event.user.email)
        .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching user:', fetchError);
        return;
    }

    if (existingUser) {
        await supabase
            .from('User')
            .update({
                geoip: event?.request?.geoip || null,
                ip: event?.request?.ip || null,
            })
            .eq('id', existingUser.id);
        return;
    }

    // Create new user
    const { data: newUser, error: insertError } = await supabase
        .from('User')
        .insert([
            {
                email: event.user.email,
                name: event.user.name,
                geoip: event?.request?.geoip || null,
                ip: event?.request?.ip || null,
            }
        ])
        .single();

    console.log("NEW USER", newUser)

    if (insertError) {
        console.error('Error creating user:', insertError);
        return;
    }

    console.log('User created successfully:', newUser);
}
