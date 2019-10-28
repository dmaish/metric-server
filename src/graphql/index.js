import { gql } from 'apollo-server-express';
import firebaseObj from '../../src';

const schema = gql`

    type Query {
        me: userWorkoutRecord
    }

    type Mutation {
        addWorkout(workoutRecord: userWorkoutRecordInput): userWorkoutRecord!
    }

    type userWorkoutRecord {
        name: String!
        email: String!
        password: String!
        workoutDays: [workoutDay!]!
    }

    input userWorkoutRecordInput {
        name: String!
        email: String!
        password: String!
        workoutDays: [workoutDayInput!]!
    }


    type workoutDay {
        date: String!
        sessions: [Session]!
    }

    input workoutDayInput {
        date: String
        sessions: [SessionInput]
    }

    type Session {
        timeOfDay: String!
        exercises: [Exercise]!
    }

    input SessionInput {
        timeOfDay: String!
        exercises: [ExerciseInput]!
    }

    type Exercise {
        name: String!
        sets: [Set]!
    }

    input ExerciseInput {
        name: String!
        sets: [SetInput]!
    }

    type Set {
        name: String!
        weight: String!
        reps: String!
    }

    input SetInput {
        name: String!
        weight: String!
        reps: String!
    }

    `;

    const resolvers = {
    Query: {
        me: () => {
        return {
            username: 'Robin Wieruch',
            somestring: 'hey daniel'
        };
        },
    },

    Mutation: {
        addWorkout: async (parent, {workoutRecord : { name, email, password, workoutDays}}) => {
            var firebaseWrite = await firebaseObj.database().ref(`/${name}`).set({
                name,
                password,
                email,
                workoutDays
            },
            (error) => {
                if (error) {
                    return error;
                } else {
                    console
                }
            });
            return {
                name,
                password,
                email,
                workoutDays         
            }
        }
    }
    };
    
    export { schema, resolvers };