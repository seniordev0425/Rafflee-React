import {APIROUTE} from '../utils/constants'

export const verifyToken = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("token", token);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };
    return fetch(APIROUTE + "token/verify/", requestOptions)
}



// export const resetPasswordRequest = (values) => {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
//     var urlencoded = new URLSearchParams();
//     urlencoded.append("email", values.email);
    
//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: urlencoded,
//       redirect: 'follow'
//     };
//     return fetch(APIROUTE + "account/password/reset/email/", requestOptions)
// }

// export const resetPassword = (values, token, id) => {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//     var urlencoded = new URLSearchParams();
//     urlencoded.append("token", token);
//     urlencoded.append("id", id);
//     urlencoded.append("password", values.password);
//     urlencoded.append("password_confirmation", values.password_confirmation);

//     console.log(urlencoded)
//     var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: urlencoded,
//     redirect: 'follow'
//     };

//     return fetch(APIROUTE + "account/password/reset/", requestOptions)
// }

// export const deleteAccountRequest = (values) => {
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", 'JWT ' + sessionStorage.getItem('token'));
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//     var urlencoded = new URLSearchParams();
//     urlencoded.append("password", values.password);

//     var requestOptions = {
//     method: 'DELETE',
//     headers: myHeaders,
//     body: urlencoded,
//     redirect: 'follow'
//     };

//     return fetch(APIROUTE + "account/profile/delete/", requestOptions)
// }
  

// export const companyContact = (values) => {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//     var urlencoded = new URLSearchParams();
//     urlencoded.append("email", values.email);
//     urlencoded.append("phone_number", values.phonenumber.phone_number);
//     urlencoded.append("company_name", values.company_name);
//     urlencoded.append("message", values.message);

//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: urlencoded,
//         redirect: 'follow'
//     };
//     return fetch(APIROUTE + "company/contact-form/", requestOptions)
// }

// export const logOut = (token) => {
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", "JWT " + token);

//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         redirect: 'follow'
//     };
//     return fetch(APIROUTE + "logout/", requestOptions)
// }

// export const updateUserProfile = (values, birth_date, img, country) => {
//     var myHeaders = new Headers()
//     myHeaders.append("Authorization", "JWT " + sessionStorage.getItem('token'));

//     var formdata = new FormData();
//     formdata.append("profile_picture", img);
//     formdata.append("phone_number", values.phonenumber.phone_number);
//     formdata.append("prefix_number", values.phonenumber.phone_country);
//     formdata.append("country", country);
//     formdata.append("region", values.postal_code);
//     formdata.append("birth_date", birth_date);
//     formdata.append("first_name", values.first_name);
//     formdata.append("last_name", values.last_name);
//     formdata.append("address", values.address);
//     formdata.append("city", values.street);
//     formdata.append("gender", values.gender);

//     var requestOptions = {
//         method: 'POST',
//         body: formdata,
//         headers: myHeaders,
//         redirect: 'follow',
//     };
//     return fetch(APIROUTE + "account/profile/update/", requestOptions)
// }

// export const updateCompanyProfile = (values, country, img) => {
//     var myHeaders = new Headers()
//     myHeaders.append("Authorization", "JWT " + sessionStorage.getItem('token'));

//     var formdata = new FormData();
//     formdata.append("logo", img);
//     formdata.append("phone_number", values.phonenumber.phone_number);
//     formdata.append("prefix_number", values.phonenumber.phone_country);
//     formdata.append("country", country);
//     formdata.append("region", values.postal_code);
//     formdata.append("address", values.address);
//     formdata.append("city", values.street);

//     var requestOptions = {
//         method: 'POST',
//         body: formdata,
//         headers: myHeaders,
//         redirect: 'follow',
//     };
//     return fetch(APIROUTE + "company/profile/update/", requestOptions)
// }

// export const getHighlightedPromotions = () => {
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//     };
      
//     return fetch(APIROUTE + "homepage/highlights/", requestOptions)
// }

// export const getHotPromotions = () => {
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//     };
      
//     return fetch(APIROUTE + "homepage/hot/", requestOptions)
// }

// export const getNewPromotions = () => {
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//     };
      
//     return fetch(APIROUTE + "homepage/new/", requestOptions)
// }

// export const getBestOfferPromotions = () => {
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//     };
      
//     return fetch(APIROUTE + "homepage/end-soon/", requestOptions)
// }

// export const getMyCampaigns = () => {
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", "JWT " + sessionStorage.getItem('token'));

//     var requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//     redirect: 'follow'
//     };

//     return fetch(APIROUTE + "company/campaign/", requestOptions)
// }

// export const getMyBills = () => {
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", "JWT " + sessionStorage.getItem('token'));

//     var requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//     redirect: 'follow'
//     };

//     return fetch(APIROUTE + "company/bills/", requestOptions)
// }

// export const sendSmsToUser = (values) => {
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", "JWT " + sessionStorage.getItem('token'));
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
//     var urlencoded = new URLSearchParams();
//     urlencoded.append("number", "+" + values.phonenumber.phone_country + values.phonenumber.phone_number);
    
//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: urlencoded,
//       redirect: 'follow'
//     };
    
//     return fetch(APIROUTE + "account/number/send-sms/", requestOptions)
// }

// export const createCampaign = (firstFormData, poll) => {
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", "JWT " + sessionStorage.getItem('token'));

//     var formdata = new FormData();
//     formdata.append("promotion_picture", firstFormData.promotion_picture);
//     formdata.append("promotion_name", firstFormData.promotion_name);
//     formdata.append("promotion_description", firstFormData.promotion_description);
//     formdata.append("promotion", firstFormData.promotion);
//     formdata.append("distribution", firstFormData.distribution);
//     formdata.append("start_date", firstFormData.start_date);
//     formdata.append("end_date", firstFormData.end_date);
//     formdata.append("winnings_start_date", firstFormData.winnings_start_date);
//     formdata.append("winnings_expiration_date", firstFormData.winnings_expiration_date);
//     formdata.append("winnings", JSON.stringify(firstFormData.winnings));
//     if (poll)
//          formdata.append("poll", JSON.stringify(poll));
//     else formdata.append("poll", "false");
//     formdata.append("twitter", JSON.stringify(firstFormData.social_actions.twitter));
//     formdata.append("facebook",  JSON.stringify(firstFormData.social_actions.facebook));
//     formdata.append("instagram",  JSON.stringify(firstFormData.social_actions.instagram));
//     formdata.append("youtube",  JSON.stringify(firstFormData.social_actions.youtube));
//     formdata.append("twitch",  JSON.stringify(firstFormData.social_actions.twitch));
//     if (firstFormData.categories)
//          formdata.append("categories",  JSON.stringify(firstFormData.categories));
//     else formdata.append("categories",  "false");
    
//     var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: formdata,
//     redirect: 'follow'
//     };

//     return fetch(APIROUTE + "campaign/create/", requestOptions) 
// }

// export const getCategories = () => {
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//     };
      
//     return fetch(APIROUTE + "categories/", requestOptions)
// }

// export const getCampaignData = (id) => {
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//     };
      
//     return fetch(APIROUTE + `campaign/${id}/`, requestOptions)
// }

// export const campaignParticipate = (id) => {
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", "JWT " + sessionStorage.getItem('token'));
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//     var urlencoded = new URLSearchParams();
//     urlencoded.append("promotion_id", id);

//     var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: urlencoded,
//     redirect: 'follow'
//     };

//     return fetch(APIROUTE + "campaign/participate/", requestOptions)
// }

// export const getCampaignParticipants = (id) => {
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", "JWT " + sessionStorage.getItem('token'));

//     var requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//     };
      
//     return  fetch(APIROUTE + `campaign/participants/${id}/`, requestOptions)
// }

// export const getCampaignWinnings = (id) => {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
//     myHeaders.append("Authorization", "JWT " + sessionStorage.getItem('token'));

//     var requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//     redirect: 'follow'
//     };

//     return fetch(APIROUTE + `campaign/live/get-winnings/${id}/`, requestOptions)
// }

// export const drawCampaign = (id, drawType, winningType) => {
//     var myHeaders = new Headers();
//     var urlencoded = new URLSearchParams();
//     myHeaders.append("Authorization", "JWT " + sessionStorage.getItem('token'));

//     if (drawType === 'draw_by_gift' || drawType === 'draw_all_by_gift'){
//         myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
//         urlencoded.append("winning_name", winningType);
        
//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: urlencoded,
//             redirect: 'follow'
//         };
//     }
//     else {
//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             redirect: 'follow'
//         };
//     }
    
//     var endpoint = ''
//     if (drawType === 'draw_by_gift')
//         endpoint = 'campaign/live/pick/'
//     else if (drawType === 'draw_all_by_gift')
//         endpoint = 'campaign/live/all/'
//     else if (drawType === 'draw')
//         endpoint = 'campaign/live/'
//     else if (drawType === 'draw_all')
//         endpoint = 'campaign/live/finish/'
    
//     return fetch(APIROUTE + endpoint + id + '/', requestOptions)
// }

// export const getParticipateHistory = () => {
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", "JWT " + sessionStorage.getItem('token'));

//     var requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//     redirect: 'follow'
//     };

//     return fetch(APIROUTE + "campaign/user/historical/", requestOptions)  
// }




