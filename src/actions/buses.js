import { FETCH_ALL_BUSES } from './types';
import axios from 'axios';
import * as appConstants from '../config/constants';

export const fetchBuses = (buses) => {
    return {
        type: FETCH_ALL_BUSES,
        buses
    }
};

export const fetchAllBuses = (formData) => { 
    return (dispatch) => {
        let busFrom = formData ? formData.from : '1';
        let busTo = formData ? formData.to : '2';
        let url = appConstants.GET_ALL_ITEMS_URL + '?from='+busFrom+'&to='+busTo+'&jDate='+formData.jDate;
        return axios.post(url, formData)
            .then(response => { 
                dispatch(fetchBuses(response.data));
            })
            .catch(error => {
                throw (error);
            });
    };
};