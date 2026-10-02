import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    isCreatedUser: false,
    isEditedUser: false
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoadingGender: true
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.data,
                isLoadingGender: false
            }
        case actionTypes.FETCH_GENDER_FAIDED:
            return {
                ...state,
                isLoadingGender: false,
                genders: []
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.data
            }
        case actionTypes.FETCH_POSITION_FAILDED:
            return {
                ...state,
                positions: []
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.data
            }
        case actionTypes.FETCH_ROLE_FAILDED:
            return {
                ...state,
                roles: []
            }

        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                isCreatedUser: true
            }

        case actionTypes.CREATE_USER_FAILDED:
            return {
                ...state,
                isCreatedUser: false
            }

        case actionTypes.EDIT_USER_SUCCESS:
            return {
                ...state,
                isEditedUser: true,
                users: state.users.map((user) =>
                    user.id === action.user.id ? { ...user, ...action.user } : user
                )
            }

        case actionTypes.DELETE_USER_SUCCESS:
            return {
                ...state
            }

        case actionTypes.EDIT_USER_FAILDED:
            return {
                ...state,
                isEditedUser: false
            }

        case actionTypes.DELETE_USER_FAILDED:
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.users,
                isCreatedUser: false,
                isEditedUser: false
            }

        case actionTypes.FETCH_ALL_USERS_FAILDED:
            return {
                ...state,
                users: [],
                isCreatedUser: false,
                isEditedUser: false
            }

        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            return {
                ...state,
                topDoctors: action.dataDoctors,
                isCreatedUser: false,
                isEditedUser: false
            }

        case actionTypes.FETCH_TOP_DOCTORS_FAILDED:
            return {
                ...state,
                topDoctors: [],
                isCreatedUser: false,
                isEditedUser: false
            }


              case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            return {
                ...state,
                allDoctors: action.dataDr,
                isCreatedUser: false,
                isEditedUser: false
            }

        case actionTypes.FETCH_ALL_DOCTORS_FAILDED:
            return {
                ...state,
                allDoctors: [],
                isCreatedUser: false,
                isEditedUser: false
            }

        default:
            return state;
    }
}

export default adminReducer;
