const errorMessages = {
  en: {
    MSG_ERROR_LOGIN_CONNECT: "Something went wrong",
    MSG_USER_NOT_EXIST: "User account does not exist",
    MSG_INVALID_PASSWORD: "Username or password not correct",
    MSG_FIELD_REQUIRED: "Parameters missing or error with parameters",
    MSG_PASSWORD_PROBLEM: "Error system, encoding password",
    MSG_USER_NOT_ACTIVE: "Account not activated",
    MSG_USER_LOGOUT: "User disconnected",
    MSG_EMAIL_RESET_PASSWORD_SENDED: "Email reset password sended",
    MSG_PASSWORD_UPDATED: "Password updated",
    MSG_ERROR_SERVER: "Error server",
    MSG_PASSWORDS_DONT_MATCH: "Password does not match",
    MSG_BAD_REQUEST: "Bad request",
    MSG_PASSWORD_TO_SIMPLE: "New password too simple",
    MSG_REPEAT_PASSWORD_DOES_NOT_MATCH: "New repeat password not matching",
    MSG_PHONE_NUMBER_ERROR: "Error with the phone number",
    MSG_SMS_SENDED: "Sms sended",
    MSG_ERROR_CODE_NOT_CORRESPONDING: "Code not corresponding with the phone number",
    MSG_PHONE_NUMBER_CONFIRMED: "Phone number confirmed",
    MSG_PHONE_NUMBER_NOT_CONFIRMED: "Phone number not confirmed",
    MSG_USERNAME_ALREADY_EXIST: "Username already exist",
    MSG_EMAIL_ALREADY_EXIST: "Email already exist",
    MSG_USER_CREATED: "User created",
    MSG_ERROR_WITH_SENDING_EMAIL: "Error with the sending email",
    MSG_COMPANY_NAME_ALREADY_EXIST: "Account with this company name already exist",
    MSG_USER_AND_COMPANY_CREATED: "Company account created",
    MSG_CONTACT_FORM_SAVED: "Company form saved",
    MSG_ACCOUNT_ACTIVATED: "Account activated",
    MSG_ERROR_WITH_THE_CONFIRMATION_ACCOUNT: "Error with the confirmation account",
    MSG_USER_DELETED: "User deleted",
    MSG_ERROR_DELETE: "Error deleting user",
    MSG_NO_PROMOTION_FINDED: "Promotion not finded",
    MSG_COUPON_NOT_EXIST: "Coupon not exist",
    MSG_PROMOTION_STILL_IN_PROGRESS: "Promotion still in progress",
    MSG_WINNING_WILL_BE_DISTRIBUTED_DURING_THE_LIVE: "Winning object will be distributed during the live",
    MSG_PROMOTION_FINDED: "Promotion finded",
    MSG_IS_A_COMPANY_ACCOUNT: "Error, company account required",
    MSG_USER_INFORMATION_UPLOADED: "User account updated",
    MSG_USER_INFORMATION_RETRIEVED: "User account retrieved",
    MSG_COMPANY_INFORMATION_RETRIEVED: "Company account updated",
    MSG_COMPANY_NOT_EXIST: "Company account does not exist",
    MSG_CAMPAIGNS_NOT_EXIST: "Campaign does not exist",
    MSG_USER_IS_NOT_THE_OWNER: "Account does not have the required rights",
    MSG_NO_BILLS_FINDED: "No bills finded",
    MSG_NO_BILL_PDF_FINDED: "No bills pdf finded",
    MSG_BILL_PDF_FINDED: "Bills pdf finded",
    MSG_NO_CATEGORIES_FINDED: "No categories finded",
    MSG_CATEGORIES_FINDED: "Categories finded",
    MSG_IMPOSSIBLE_TO_PARTICIPATE_WITH_PRO_ACCOUNT: "Impossible to participate with a company account",
    MSG_GIVEWAY_NOT_EXIST: "Giveways not exist",
    MSG_PARTICIPATION_ACCEPTED: "Participation accepted",
    MSG_ALREADY_PARTICIPATED: "The user has already participated",
    MSG_NO_SOCIAL_ACTION_FOUND: "No social action finded",
    MSG_ERROR_SERVER_PROMOTION_CREATION: "Error with the promotion creation",
    MSG_ERROR_SERVER_CATEGORIES_CREATION: "Error with the categories creation",
    MSG_ERROR_SERVER_CREATION_POLL: "Error with the poll creation",
    MSG_ERROR_SERVER_GIVEWAY_CREATION: "Error with the giveway creation",
    MSG_ERROR_SERVER_COUPON_CREATION: "Error with the coupon creation",
    MSG_PROMOTION_CREATED: "Promotion created",
    ALL_WINNING_OBJECT_ARE_DISTRIBUTED: "All giveways are distributed",
    MSG_WINNER_FINDED: "Winner finded",
    MSG_WINNERS_FINDED: "All the winners finded",
    MSG_FAVORITE_NOT_FINDED: "Favorite not finded",
    MSG_NO_FAVORITE_FINDED: "No favorite finded",
    MSG_FAVORITE_FINDED: "Favorite finded",
    MSG_FAVORITE_DELETED: "Favorite deleted",
    MSG_FAVORITE_ADDED: "Favorite added",
    MSG_OAUTH_TOKEN_TWITTER: "Error with twitter connect",
    MSG_TWITTER_LOGIN_VALIDATED: "Connection with twitter validated",
    MSG_TWITCH_LOGIN_VALIDATED: "Connection with twitch validated",
    MSG_USER_DEACTIVATE: "Account deactivate",
    MSG_GIVEAWAY_NOT_EXIST: "Giveaway does not exist",
    MSG_ALL_WINNING_OBJECT_ARE_DISTRIBUTED: "All gift have been distributed",
    MSG_ERROR_WITH_TWITTER_LOGIN: "Error with twitter login",
    MSG_ERROR_WITH_TWITTER_OAUTH_TOKEN: "Error with twitter connect",
    MSG_ERROR_WITH_URL: "Error server",
    MSG_ERROR_WITH_TWITCH_GET_USER_INFORMATIONS: "Error with twitch connect",
    MSG_ERROR_WITH_TWITCH_OAUTH_TOKEN: "Error with twitch connect",
    MSG_ERROR_USER_NOT_CONNECTED_TO_TWITCH: "Please connect to twitch",
    MSG_ERROR_USER_NOT_CONNECTED_TO_TWITTER: "Please connect to twitter",
    MSG_PARTICIPATION_NOT_VALIDATED: "You have to validate actions",
    MSG_MANDATORY_ACTION_IS_NOT_VALIDATED: "Mandatory Actions are not validated",
    MSG_ERROR_WITH_SNAPCHAT_URL: "Error with the snapchat connection",
    MSG_ERROR_SNAPCHAT_USER_PROFILE: "Error with the snapchat connection",
    MSG_ERROR_WITH_SNAPCHAT_OAUTH_TOKEN: "Error with the snapchat connection",
    MSG_ERROR_LOGIN_GOOGLE_CONNECT: "Error with the google connect",
    MSG_NO_OVERVIEW_ANALYTICS: "No overview founded",
    MSG_NO_BILLS_FOUND: "No bills founded",
    MSG_NO_BILL_PDF_FOUND: "No bills founded",
    MSG_MAXIMUM_NUMBER_OF_USERS_REACHED: "The maximum number of participants is reached",
    MSG_ERROR_WITH_ANALYTICS: "Error with the analytics",
    MSG_ACTION_NOT_ACTIVATED: "Action is not activated",
    MSG_ERROR_WITH_TWITTER_TWEET: "Error with the tweet action",
    MSG_ERROR_WITH_TWITTER_LIKE: "Error with the action like with twitter",
    MSG_ERROR_WITH_TWITTER_FOLLOW: "Error with the action follow with twitter",
    MSG_ERROR_WITH_FOLLOW_TWITCH_ACCOUNT: "Error with the action follow with twitch",
    MSG_PROMOTIONS_NOT_FOUND: "No promotions founded",
    MSG_ERROR_CHANNEL_NOT_FOUND: "Error no channel founded",
    MSG_NO_CATEGORIES_FOUND: "No categories founded",
    MSG_ERROR_WITH_REPORT: "Error with the report",
    MSG_ERROR_ACTION_ALREADY_VALIDATED: "Action already validated",
    MSG_ERROR_INSTAGRAM_BUSINESS_CONNECT: "Impossible to connect your instagram account. Please contact support",
    MSG_ENTER_A_DIFFERENT_EMAIL: "Enter a different email",
    MSG_EMAIL_NOT_CONFIRMED: "Please verify email",
    MSG_CAMPAIGN_NAME_REQUIRED: "Campaign name is required",
    MSG_PHONE_NUMBER_ALREADY_LINKED_TO_AN_ACCOUNT: "Phone number already linked to an account",
    MSG_RECRUITMENTS_ARE_CLOSED: "Recruitments are closed",
    MSG_REQUEST_WITH_THIS_NAME_ALREADY_EXIST: "Request with this name already exists",
    MSG_ERROR_WITH_YOUTUBE_COMMENT: "Error with youtube comment action",
    MSG_ERROR_WITH_YOUTUBE_LIKE: "Error with youtube like action",
    MSG_ERROR_WITH_YOUTUBE_FOLLOW: "Error with youtube follow action"
  },


  fr: {
    MSG_USER_NOT_EXIST: "Le compte n'existe pas",
    MSG_INVALID_PASSWORD: "Le nom d'utilisateur ou le password ne sont pas correct",
    MSG_FIELD_REQUIRED: "Paramètre manquant ou erreur avec les paramètres",
    MSG_PASSWORD_PROBLEM: "Erreur système, chiffrement du mot de passe",
    MSG_USER_NOT_ACTIVE: "Le compte n'est pas activé",
    MSG_USER_LOGOUT: "Utilisateur déconnecté",
    MSG_EMAIL_RESET_PASSWORD_SENDED: "L'email de réinitialisation du mot de passe à été envoyé",
    MSG_PASSWORD_UPDATED: "Mot de passe mis à jour",
    MSG_ERROR_SERVER: "Erreur serveur",
    MSG_PASSWORDS_DONT_MATCH: "Le mot de passe ne correspond pas",
    MSG_BAD_REQUEST: "Mauvaise requête",
    MSG_PASSWORD_TO_SIMPLE: "Nouveau mot de passe trop simple",
    MSG_REPEAT_PASSWORD_DOES_NOT_MATCH: "Le nouveau mot de passe ne correspond pas",
    MSG_PHONE_NUMBER_ERROR: "Erreur avec le numéro de téléphone",
    MSG_SMS_SENDED: "SMS envoyé",
    MSG_ERROR_CODE_NOT_CORRESPONDING: "Le code ne correspond pas avec le numéro de téléphone",
    MSG_PHONE_NUMBER_CONFIRMED: "Numéro de téléphone confirmé",
    MSG_PHONE_NUMBER_NOT_CONFIRMED: "Numéro de téléphone non confirmé",
    MSG_USERNAME_ALREADY_EXIST: "Ce nom d'utilisateur existe déjà",
    MSG_EMAIL_ALREADY_EXIST: "Cet email existe déjà",
    MSG_USER_CREATED: "Utilisateur créé",
    MSG_ERROR_WITH_SENDING_EMAIL: "Erreur avec l'envoi d'email",
    MSG_COMPANY_NAME_ALREADY_EXIST: "Un compte avec ce nom d'entreprise existe déjà",
    MSG_USER_AND_COMPANY_CREATED: "Compte entreprise créé",
    MSG_CONTACT_FORM_SAVED: "Formulaire de création d'entreprisé envoyé",
    MSG_ACCOUNT_ACTIVATED: "Compte activé",
    MSG_ERROR_WITH_THE_CONFIRMATION_ACCOUNT: "Erreur avec la confirmation du compte",
    MSG_USER_DELETED: "Utilisateur supprimé",
    MSG_ERROR_DELETE: "Erreur avec la suppression du compte",
    MSG_NO_PROMOTION_FINDED: "Promotion non trouvé",
    MSG_COUPON_NOT_EXIST: "Le prix n'existe pas",
    MSG_PROMOTION_STILL_IN_PROGRESS: "Promotion toujours en cours",
    MSG_WINNING_WILL_BE_DISTRIBUTED_DURING_THE_LIVE: "Le prix sera distribué pendant le live",
    MSG_PROMOTION_FINDED: "Promotion trouvé",
    MSG_IS_A_COMPANY_ACCOUNT: "Erreur, compte d'entreprise requis",
    MSG_USER_INFORMATION_UPLOADED: "Compte utilisateur mis à jour",
    MSG_USER_INFORMATION_RETRIEVED: "Compte utilisateur récupéré",
    MSG_COMPANY_INFORMATION_RETRIEVED: "Compte entreprise mis à jour",
    MSG_COMPANY_NOT_EXIST: "Le compte d'entreprise n'existe pas",
    MSG_CAMPAIGNS_NOT_EXIST: "La promotion n'existe pas",
    MSG_USER_IS_NOT_THE_OWNER: "Le compte n'a pas les droits requis",
    MSG_NO_BILLS_FINDED: "Pas de facture trouvé",
    MSG_NO_BILL_PDF_FINDED: "Pas de facture au format pdf trouvé",
    MSG_BILL_PDF_FINDED: "Facture au format pdf trouvé",
    MSG_NO_CATEGORIES_FINDED: "Aucunes catégories trouvé",
    MSG_CATEGORIES_FINDED: "Catégories trouvé",
    MSG_IMPOSSIBLE_TO_PARTICIPATE_WITH_PRO_ACCOUNT: "Impossible de participer avec un compte entreprise",
    MSG_GIVEWAY_NOT_EXIST: "Prix non trouvé",
    MSG_PARTICIPATION_ACCEPTED: "Participation accepté",
    MSG_ALREADY_PARTICIPATED: "Le compte participe déjà",
    MSG_NO_SOCIAL_ACTION_FOUND: "Actions non trouvées",
    MSG_ERROR_SERVER_PROMOTION_CREATION: "Erreur avec la création de la promotion",
    MSG_ERROR_SERVER_CATEGORIES_CREATION: "Erreur avec la création de la catégorie",
    MSG_ERROR_SERVER_CREATION_POLL: "Erreur avec la création du sondage",
    MSG_ERROR_SERVER_GIVEWAY_CREATION: "Erreur avec la création des prix",
    MSG_ERROR_SERVER_COUPON_CREATION: "Erreur avec la création des prix",
    MSG_PROMOTION_CREATED: "Promotion créé",
    ALL_WINNING_OBJECT_ARE_DISTRIBUTED: "Tout les prix ont été distribué",
    MSG_WINNER_FINDED: "Gagnant trouvé",
    MSG_WINNERS_FINDED: "Tout les gagnant ont été trouvé",
    MSG_FAVORITE_NOT_FINDED: "Favoris non trouvés",
    MSG_NO_FAVORITE_FINDED: "Aucun favoris trouvés",
    MSG_FAVORITE_FINDED: "Favoris trouvé",
    MSG_FAVORITE_DELETED: "Favoris supprimé",
    MSG_FAVORITE_ADDED: "Favoris ajouté",
    MSG_OAUTH_TOKEN_TWITTER: "Erreur avec le twitter connect",
    MSG_TWITTER_LOGIN_VALIDATED: "Connection avec twitter validé",
    MSG_TWITCH_LOGIN_VALIDATED: "Connection avec twitch validé",
    MSG_USER_DEACTIVATE: "Compte désactivé",
    MSG_GIVEAWAY_NOT_EXIST: "Le prix n'existe pas",
    MSG_ALL_WINNING_OBJECT_ARE_DISTRIBUTED: "Tout les prix ont été distribué",
    MSG_ERROR_WITH_TWITTER_LOGIN: "Erreur avec le twitter login",
    MSG_ERROR_WITH_TWITTER_OAUTH_TOKEN: "Erreur avec la connection à twitter",
    MSG_ERROR_WITH_URL: "Erreur serveur",
    MSG_ERROR_WITH_TWITCH_GET_USER_INFORMATIONS: "Erreur avec la connection à twitch",
    MSG_ERROR_WITH_TWITCH_OAUTH_TOKEN: "Erreur avec la connection à twitch",
    MSG_ERROR_USER_NOT_CONNECTED_TO_TWITCH: "Connecte toi à Twitch",
    MSG_ERROR_USER_NOT_CONNECTED_TO_TWITTER: "Connecte toi à Twitter",
    MSG_PARTICIPATION_NOT_VALIDATED: "Valide les actions",
    MSG_MANDATORY_ACTION_IS_NOT_VALIDATED: "Les actions obligatoires ne sont pas effectuées",
    MSG_ERROR_WITH_SNAPCHAT_URL: "Erreur avec la connection à Snapchat",
    MSG_ERROR_SNAPCHAT_USER_PROFILE: "Erreur avec la connection à Snapchat",
    MSG_ERROR_WITH_SNAPCHAT_OAUTH_TOKEN: "Erreur avec la connection à Snapchat",
    MSG_ERROR_LOGIN_GOOGLE_CONNECT: "Erreur avec la connection à Google",
    MSG_NO_OVERVIEW_ANALYTICS: "Aucun aperçu trouvé",
    MSG_NO_BILLS_FOUND: "Aucunes factures trouvé",
    MSG_NO_BILL_PDF_FOUND: "Aucunes factures trouvé",
    MSG_MAXIMUM_NUMBER_OF_USERS_REACHED: "Le nombre maximum de participants est atteind",
    MSG_ERROR_WITH_ANALYTICS: "Erreur avec les analytiques",
    MSG_ACTION_NOT_ACTIVATED: "L'action n'est pas activé",
    MSG_ERROR_WITH_TWITTER_TWEET: "Erreur avec l'action de tweet",
    MSG_ERROR_WITH_TWITTER_LIKE: "Erreur avec l'action like de twitter",
    MSG_ERROR_WITH_TWITTER_FOLLOW: "Erreur avec l'action follow de twitter",
    MSG_ERROR_WITH_FOLLOW_TWITCH_ACCOUNT: "Erreur avec l'action follow de twitter",
    MSG_PROMOTIONS_NOT_FOUND: "Aucunes promotions trouvées",
    MSG_ERROR_CHANNEL_NOT_FOUND: "Erreur, aucun channel trouvé",
    MSG_NO_CATEGORIES_FOUND: "Aucunes categories trouvé",
    MSG_ERROR_WITH_REPORT: "Erreur avec la fonction de report",
    MSG_ERROR_ACTION_ALREADY_VALIDATED: "L'action est déjà validé",
    MSG_ERROR_INSTAGRAM_BUSINESS_CONNECT: "Impossible de connecter votre compte instagram. Contactez le support",
    MSG_ENTER_A_DIFFERENT_EMAIL: "Entrez un autre e-mail",
    MSG_EMAIL_NOT_CONFIRMED: "Veuillez vérifier votre email",
    MSG_CAMPAIGN_NAME_REQUIRED: "Le nom de la campagne est requis",
    MSG_PHONE_NUMBER_ALREADY_LINKED_TO_AN_ACCOUNT: "Le numéro de téléphone est déjà lie à un compte",
    MSG_RECRUITMENTS_ARE_CLOSED: "Les recrutements sont fermés",
    MSG_REQUEST_WITH_THIS_NAME_ALREADY_EXIST: "Une demande portant ce nom existe déjà",
    MSG_ERROR_WITH_YOUTUBE_COMMENT: "Error with youtube comment action",
    MSG_ERROR_WITH_YOUTUBE_LIKE: "Error with youtube like action",
    MSG_ERROR_WITH_YOUTUBE_FOLLOW: "Error with youtube follow action"
  }
}

export default errorMessages;   