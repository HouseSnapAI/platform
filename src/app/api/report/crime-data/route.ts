import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';
import { z } from 'zod';
import { CrimeDataType } from '@/utils/types';

const schema = z.object({
  crime_data_ids: z.array(z.number()),
});

export const POST = withApiAuthRequired(async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const parseResult = schema.safeParse(await req.json());
  if (!parseResult.success) {
    return NextResponse.json({ message: 'Invalid request body', errors: parseResult.error.errors }, { status: 400 });
  }

  const { crime_data_ids } = parseResult.data;

  try {
    const { data, error } = await supabase
      .from('crime_data_ca')
      .select('*')
      .in('id', crime_data_ids)

    if (error) {
      console.error('Error fetching crime data', error);
      return NextResponse.json({ message: 'Error fetching crime data' }, { status: 500 });
    }

    

    // console.log(data);
    let dataNew: CrimeDataType = {
      offense_linked_to_another_offense: [],
      crime_location: [],
      offender_age: [],
      offender_ethnicity: [],
      offender_race: [],
      offender_sex: [],
      all_violent_crime_trend: [],
      type_of_weapon: [],
      victim_age: [],
      victim_ethnicity: [],
      victim_race: [],
      victim_sex: [],
      victim_relationship_to_offender: [],
      agencies: [],
    }

    for (let i = 0; i < data.length; i++) {
      let temp = data[i];

      if (temp.offense_linked_to_another_offense && temp.offense_linked_to_another_offense[0]?.value != "No data") {
        if (dataNew.offense_linked_to_another_offense.length == 0) {
          dataNew.offense_linked_to_another_offense = temp.offense_linked_to_another_offense;
        } else {
          for (let j = 0; j < temp.offense_linked_to_another_offense.length; j++) {
            dataNew.offense_linked_to_another_offense[j].value += temp.offense_linked_to_another_offense[j].value;
          }
        }
      }

      if (temp.crime_location && temp.crime_location[0]?.value != "No data") {
        if (dataNew.crime_location.length == 0) {
          dataNew.crime_location = temp.crime_location;
        } else {
          for (let j = 0; j < temp.crime_location.length; j++) {
            dataNew.crime_location[j].value += temp.crime_location[j].value;
          }
        }
      }

      if (temp.offender_age && temp.offender_age[0]?.value != "No data") {
        if (dataNew.offender_age.length == 0) {
          dataNew.offender_age = temp.offender_age;
        } else {
          for (let j = 0; j < temp.offender_age.length; j++) {
            dataNew.offender_age[j].value += temp.offender_age[j].value;
          }
        }
      }

      if (temp.offender_ethnicity && temp.offender_ethnicity[0]?.value != "No data") {
        if (dataNew.offender_ethnicity.length == 0) {
          dataNew.offender_ethnicity = temp.offender_ethnicity;
        } else {
          for (let j = 0; j < temp.offender_ethnicity.length; j++) {
            dataNew.offender_ethnicity[j].value += temp.offender_ethnicity[j].value;
          }
        }
      }

      if (temp.offender_race && temp.offender_race[0]?.value != "No data") {
        if (dataNew.offender_race.length == 0) {
          dataNew.offender_race = temp.offender_race;
        } else {
          for (let j = 0; j < temp.offender_race.length; j++) {
            dataNew.offender_race[j].value += temp.offender_race[j].value;
          }
        }
      }

      if (temp.offender_sex && temp.offender_sex[0]?.series != null) {
        if (dataNew.offender_sex.length == 0) {
          dataNew.offender_sex = temp.offender_sex;
        } else {
          Object.keys(data[0].offender_sex[0]).forEach((key) => {
            data[0].offender_sex[0][key] += temp.offender_sex[0][key];
          });
        }
      }

      if (temp.all_violent_crime_trend) {
        if (dataNew.all_violent_crime_trend.length == 0) {
          dataNew.all_violent_crime_trend = temp.all_violent_crime_trend;
        } else {
          for (let j = 0; j < dataNew.all_violent_crime_trend.length; j++) {
            Object.keys(dataNew.all_violent_crime_trend[j]).forEach(item => {
              if (item != "series") {
                dataNew.all_violent_crime_trend[j][item] += temp.all_violent_crime_trend[j][item];
              }
            })
          }
        }
      }

      if (temp.type_of_weapon && temp.type_of_weapon[0]?.value != "No data") {
        if (dataNew.type_of_weapon.length == 0) {
          dataNew.type_of_weapon = temp.type_of_weapon;
        } else {
          for (let j = 0; j < temp.type_of_weapon.length; j++) {
            dataNew.type_of_weapon[j].value += temp.type_of_weapon[j].value;
          }
        }
      }

      if (temp.victim_age && temp.victim_age[0]?.value != "No data") {
        if (dataNew.victim_age.length == 0) {
          dataNew.victim_age = temp.victim_age;
        } else {
          for (let j = 0; j < temp.victim_age.length; j++) {
            dataNew.victim_age[j].value += temp.victim_age[j].value;
          }
        }
      }

      if (temp.victim_ethnicity && temp.victim_ethnicity[0]?.value != "No data") {
        if (dataNew.victim_ethnicity.length == 0) {
          dataNew.victim_ethnicity = temp.victim_ethnicity;
        } else {
          for (let j = 0; j < temp.victim_ethnicity.length; j++) {
            dataNew.victim_ethnicity[j].value += temp.victim_ethnicity[j].value;
          }
        }
      }

      if (temp.victim_race && temp.victim_race[0]?.value != "No data") {
        if (dataNew.victim_race.length == 0) {
          dataNew.victim_race = temp.victim_race;
        } else {
          for (let j = 0; j < temp.victim_race.length; j++) {
            dataNew.victim_race[j].value += temp.victim_race[j].value;
          }
        }
      }

      if (temp.victim_sex && temp.victim_sex[0]?.series != null) {
        if (dataNew.victim_sex.length == 0) {
          dataNew.victim_sex = temp.victim_sex;
        } else {
          Object.keys(data[0].victim_sex[0]).forEach((key) => {
            data[0].victim_sex[0][key] += temp.victim_sex[0][key];
          });
        }
      }

      if (temp.victim_relationship_to_offender && temp.victim_relationship_to_offender[0]?.value != "No data") {
        if (dataNew.victim_relationship_to_offender.length == 0) {
          dataNew.victim_relationship_to_offender = temp.victim_relationship_to_offender;
        } else {
          for (let j = 0; j < temp.victim_relationship_to_offender.length; j++) {
            dataNew.victim_relationship_to_offender[j].value += temp.victim_relationship_to_offender[j].value;
          }
        }
      }

      dataNew.agencies.push(temp.agency_name);
      
    }

    return NextResponse.json(dataNew, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
});