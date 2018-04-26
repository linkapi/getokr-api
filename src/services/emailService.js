'use strict'

const
    helper = require('sendgrid').mail,
    SENDGRID_API_KEY = require('./../config/constants').SENDGRID_API_KEY,
    sg = require('sendgrid')(SENDGRID_API_KEY),
    contactEmail = require('./../config/constants').CONTACT_EMAIL,
    Q = require('q')

function send(user, admin) {
    let
        from_email, subject, content, to_email, mail, request, name,
        df = Q.defer()

    from_email = new helper.Email(contactEmail, 'OKR Software')
    subject = 'Bem vindo ao getOkr!'
    content = new helper.Content('text/html', getHtmlNewUser(user, admin))

    to_email = new helper.Email(user.username, user.firstName);

    mail = new helper.Mail(from_email, subject, to_email, content);

    request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });

    sg.API(request, function (err, res) {
        if (err)
            return df.reject(err)

        return df.resolve(res);
    });

    return df.promise
}

function sendRecovery(user) {
    let
        from_email, subject, content, to_email, mail, request, name,
        df = Q.defer()

    from_email = new helper.Email(contactEmail, 'OKR Software')
    subject = 'GetOKR - Redefinir senha'
    content = new helper.Content('text/html', getHtmlChangePassword(user))

    to_email = new helper.Email(user.username, user.firstName);

    mail = new helper.Mail(from_email, subject, to_email, content);

    request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });

    sg.API(request, function (err, res) {
        if (err)
            return df.reject(err)

        return df.resolve(res);
    });

    return df.promise
}

module.exports = {
    send: send,
    sendRecovery: sendRecovery
}

function getHtmlNewUser(user, admin) {
    let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>getOkr - Confirmação de Cadastro</title>
    <style type="text/css">
        @import 'https://fonts.googleapis.com/css?family=Open+Sans';
        /* Client-specific Styles */
        #outlook a {
            padding: 0;
        }
        /* Force Outlook to provide a "view in browser" menu link. */
        body {
            width: 100% !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            margin: 0;
            padding: 0;
            font-family: 'Open Sans', Helvetica, Arial, sans-serif!important;
            font-weight: 400;
        }
        /* Prevent Webkit and Windows Mobile platforms from changing default font sizes, while not breaking desktop design. */
        .ExternalClass {
            width: 100%;
        }
        /* Force Hotmail to display emails at full width */
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
            line-height: 100%;
        }
        /* Force Hotmail to display normal line spacing.*/
        #backgroundTable {
            margin: 0;
            padding: 0;
            width: 100% !important;
            line-height: 100% !important;
        }
        img {
            outline: none;
            text-decoration: none;
            border: none;
            -ms-interpolation-mode: bicubic;
        }
        a img {
            border: none;
        }
        .image_fix {
            display: block;
        }
        p {
            margin: 10px 0px 0px!important;
        }
        table td {
            border-collapse: collapse;
        }
        table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        a {
            color: #86AF49!important;
            text-decoration: none;
            text-decoration: none!important;
        }
        /*STYLES*/
        table[class=full] {
            width: 100%;
            clear: both;
        }
        /*IPAD STYLES*/
        @media only screen and (max-width: 640px) {
            a[href^="tel"],
            a[href^="sms"] {
                text-decoration: none;
                color: #86AF49!important;
                /* or whatever your want */
                pointer-events: none;
                cursor: default;
            }
            .mobile_link a[href^="tel"],
            .mobile_link a[href^="sms"] {
                text-decoration: default;
                color: #0a8cce !important;
                pointer-events: auto;
                cursor: default;
            }
            table[class=devicewidth] {
                width: 440px!important;
                text-align: center!important;
            }
            table[class=devicewidthinner] {
                width: 420px!important;
                text-align: center!important;
            }
            img[class=banner] {
                width: 440px!important;
                height: auto!important;
            }
            img[class=logo-img] {
                width: 70%!important;
                height: auto!important;
            }
            img[class=colimg2] {
                width: 440px!important;
                height: 220px!important;
            }
        }
        /*IPHONE STYLES*/
        @media only screen and (max-width: 480px) {
            a[href^="tel"],
            a[href^="sms"] {
                text-decoration: none;
                color: #0a8cce;
                /* or whatever your want */
                pointer-events: none;
                cursor: default;
            }
            .mobile_link a[href^="tel"],
            .mobile_link a[href^="sms"] {
                text-decoration: default;
                color: #0a8cce !important;
                pointer-events: auto;
                cursor: default;
            }
            table[class=devicewidth] {
                width: 280px!important;
                text-align: center!important;
            }
            table[class=devicewidthinner] {
                width: 260px!important;
                text-align: center!important;
            }
            img[class=banner] {
                width: 280px!important;
                height: auto!important;
            }
            img[class=logo-img] {
                width: 70%!important;
                height: auto!important;
            }
            img[class=colimg2] {
                width: 280px!important;
                height: 140px!important;
            }
            td[class=mobile-hide] {
                display: none!important;
            }
            td[class="padding-bottom25"] {
                padding-bottom: 25px!important;
            }
        }
    </style>
</head>

<body>
    <!-- Start of preheader -->
    <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="preheader">
        <tbody>
            <tr>
                <td>
                    <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                        <tbody>
                            <tr>
                                <td width="100%">
                                    <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                                        <tbody>
                                            <!-- Spacing -->
                                            <tr>
                                                <td width="100%" height="10"></td>
                                            </tr>
                                            <!-- Spacing -->
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <!-- End of preheader -->
    <!-- Start of header -->
    <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="header">
        <tbody>
            <tr>
                <td>
                    <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                        <tbody>
                            <tr>
                                <td width="100%">
                                    <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                                        <tbody>
                                            <!-- Spacing -->
                                            <tr>
                                                <td height="20" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;">&nbsp;</td>
                                            </tr>
                                            <!-- Spacing -->
                                            <tr>
                                                <td>
                                                    <!-- logo -->
                                                    <table width="140" align="center" border="0" cellpadding="0" cellspacing="0" class="devicewidth">
                                                        <tbody>
                                                            <tr>
                                                                <td width="169" height="45" align="center">
                                                                    <div class="imgpop">
                                                                        <a target="_blank" href="#">
                                                                            <img class="logo-img" src="https://uploaddeimagens.com.br/images/000/912/897/original/logo-getokr.png?1494343572" alt="" border="0" height="35" style="display:block; border:none; outline:none; text-decoration:none;">
                                                                        </a>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- end of logo -->
                                                </td>
                                            </tr>
                                            <!-- Spacing -->
                                            <tr>
                                                <td height="20" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;">&nbsp;</td>
                                            </tr>
                                            <!-- Spacing -->
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <!-- End of Header -->
    <!-- Start Full Text -->
    <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="full-text">
        <tbody>
            <tr>
                <td>
                    <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                        <tbody>
                            <tr>
                                <td width="100%">
                                    <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                                        <tbody>
                                            <!-- Spacing -->
                                            <tr>
                                                <td height="20" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;">&nbsp;</td>
                                            </tr>
                                            <!-- Spacing -->
                                            <tr>
                                                <td>
                                                    <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner">
                                                        <tbody>
                                                            <!-- Title -->
                                                            <tr>
                                                                <td style="font-family: Open Sans, Helvetica, arial, sans-serif; font-size: 28px; font-weight:400; color: #666; text-align:center; line-height: 28px;" st-title="fulltext-heading">
                                                                    Olá, seja bem-vindo.
                                                                </td>
                                                            </tr>
                                                            <!-- End of Title -->
                                                            <!-- content -->
                                                            <tr>
                                                                <td style="font-family: 'Open Sans', Helvetica, arial, sans-serif; font-size: 14px; color: #666666; text-align:center; line-height: 30px; " st-content="fulltext-content">
                                                                    <p style="font-family: Open Sans, Helvetica, arial, sans-serif; font-size: 16px; font-weight:400; color: #666; text-align:center; line-height: 28px;">
                                                                      <u>Você foi adicionado por ` + admin.firstName + ` ` + admin.lastName + ` </u> <br>
                                                                      A partir de agora você poderá acompanhar e ajudar a sua empresa no alcance dos objetivos. 
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td height="20px">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="font-family: 'Open Sans', Helvetica, arial, sans-serif; font-size: 14px; color: #666666; text-align:center; height:50px; vertical-align:center" st-content="fulltext-content">
                                                                    <a style="width:300px; background-color: #fff!important; border:1px solid #86AF49; color: #86AF49; display: block; font-size: 16px; margin: 0 auto; padding:20px 0; height:20px;" href="http://app.getokr.com/#/login/` + user.hash + `">Clique aqui para ativar sua conta</a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td height="20px">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="font-family: 'Open Sans', Helvetica, arial, sans-serif; font-size: 14px; color: #666666; text-align:center; line-height: 30px; " st-content="fulltext-content">
                                                                    <p style="margin-top: 0!important; font-family: Open Sans, Helvetica, arial, sans-serif; font-size: 16px; font-weight:400; color: #666; text-align:center; line-height: 28px;">Se você tiver quaisquer perguntas ou comentários, envie e-mail para contato@linkapi.com</p>
                                                                </td>
                                                            </tr>
                                                            <!-- End of content -->
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <!-- end of full text -->
    <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="seperator">
        <tbody>
            <tr>
                <td>
                    <table width="600" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidth">
                        <tbody>
                            <tr>
                                <td align="center" height="30" style="font-size:1px; line-height:1px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td width="550" align="center" height="1" bgcolor="#d1d1d1" style="font-size:1px; line-height:1px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td align="center" height="30" style="font-size:1px; line-height:1px;">&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <!-- Start of Postfooter -->
    <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="postfooter">
        <tbody>
            <tr>
                <td>
                    <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                        <tbody>
                            <tr>
                                <td width="100%">
                                    <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                                        <tbody>
                                            <tr>
                                              <td align="center" valign="middle" style="font-family: Helvetica, arial, sans-serif; font-size: 14px;color: #666666" st-content="postfooter">
                                                  <a href="#" style="text-decoration: none; color: #86AF49!important">getOkr</a>
                                              </td>
                                            </tr>
                                            <!-- Spacing -->
                                            <tr>
                                                <td width="100%" height="20"></td>
                                            </tr>
                                            <!-- Spacing -->
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <!-- End of postfooter -->
</body>
</html>`

    return html
}

function getHtmlChangePassword(user) {
    let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>getOkr - Redefinição de senha</title>
        <style type="text/css">
            @import 'https://fonts.googleapis.com/css?family=Open+Sans';
            /* Client-specific Styles */
            #outlook a {
                padding: 0;
            }
            /* Force Outlook to provide a "view in browser" menu link. */
            body {
                width: 100% !important;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                margin: 0;
                padding: 0;
                font-family: 'Open Sans', Helvetica, Arial, sans-serif!important;
                font-weight: 400;
            }
            /* Prevent Webkit and Windows Mobile platforms from changing default font sizes, while not breaking desktop design. */
            .ExternalClass {
                width: 100%;
            }
            /* Force Hotmail to display emails at full width */
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
                line-height: 100%;
            }
            /* Force Hotmail to display normal line spacing.*/
            #backgroundTable {
                margin: 0;
                padding: 0;
                width: 100% !important;
                line-height: 100% !important;
            }
            img {
                outline: none;
                text-decoration: none;
                border: none;
                -ms-interpolation-mode: bicubic;
            }
            a img {
                border: none;
            }
            .image_fix {
                display: block;
            }
            p {
                margin: 10px 0px 0px!important;
            }
            table td {
                border-collapse: collapse;
            }
            table {
                border-collapse: collapse;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
            a {
                color: #86AF49!important;
                text-decoration: none;
                text-decoration: none!important;
            }
            /*STYLES*/
            table[class=full] {
                width: 100%;
                clear: both;
            }
            /*IPAD STYLES*/
            @media only screen and (max-width: 640px) {
                a[href^="tel"],
                a[href^="sms"] {
                    text-decoration: none;
                    color: #86AF49!important;
                    /* or whatever your want */
                    pointer-events: none;
                    cursor: default;
                }
                .mobile_link a[href^="tel"],
                .mobile_link a[href^="sms"] {
                    text-decoration: default;
                    color: #0a8cce !important;
                    pointer-events: auto;
                    cursor: default;
                }
                table[class=devicewidth] {
                    width: 440px!important;
                    text-align: center!important;
                }
                table[class=devicewidthinner] {
                    width: 420px!important;
                    text-align: center!important;
                }
                img[class=banner] {
                    width: 440px!important;
                    height: auto!important;
                }
                img[class=logo-img] {
                    width: 70%!important;
                    height: auto!important;
                }
                img[class=colimg2] {
                    width: 440px!important;
                    height: 220px!important;
                }
            }
            /*IPHONE STYLES*/
            @media only screen and (max-width: 480px) {
                a[href^="tel"],
                a[href^="sms"] {
                    text-decoration: none;
                    color: #0a8cce;
                    /* or whatever your want */
                    pointer-events: none;
                    cursor: default;
                }
                .mobile_link a[href^="tel"],
                .mobile_link a[href^="sms"] {
                    text-decoration: default;
                    color: #0a8cce !important;
                    pointer-events: auto;
                    cursor: default;
                }
                table[class=devicewidth] {
                    width: 280px!important;
                    text-align: center!important;
                }
                table[class=devicewidthinner] {
                    width: 260px!important;
                    text-align: center!important;
                }
                img[class=banner] {
                    width: 280px!important;
                    height: auto!important;
                }
                img[class=logo-img] {
                    width: 70%!important;
                    height: auto!important;
                }
                img[class=colimg2] {
                    width: 280px!important;
                    height: 140px!important;
                }
                td[class=mobile-hide] {
                    display: none!important;
                }
                td[class="padding-bottom25"] {
                    padding-bottom: 25px!important;
                }
            }
        </style>
    </head>

    <body>
        <!-- Start of preheader -->
        <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="preheader">
            <tbody>
                <tr>
                    <td>
                        <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                            <tbody>
                                <tr>
                                    <td width="100%">
                                        <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                                            <tbody>
                                                <!-- Spacing -->
                                                <tr>
                                                    <td width="100%" height="10"></td>
                                                </tr>
                                                <!-- Spacing -->
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- End of preheader -->
        <!-- Start of header -->
        <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="header">
            <tbody>
                <tr>
                    <td>
                        <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                            <tbody>
                                <tr>
                                    <td width="100%">
                                        <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                                            <tbody>
                                                <!-- Spacing -->
                                                <tr>
                                                    <td height="20" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;">&nbsp;</td>
                                                </tr>
                                                <!-- Spacing -->
                                                <tr>
                                                    <td>
                                                        <!-- logo -->
                                                        <table width="140" align="center" border="0" cellpadding="0" cellspacing="0" class="devicewidth">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="169" height="45" align="center">
                                                                        <div class="imgpop">
                                                                            <a target="_blank" href="#">
                                                                                <img class="logo-img" src="https://uploaddeimagens.com.br/images/000/912/897/original/logo-getokr.png?1494343572" alt="" border="0" height="35" style="display:block; border:none; outline:none; text-decoration:none;">
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!-- end of logo -->
                                                    </td>
                                                </tr>
                                                <!-- Spacing -->
                                                <tr>
                                                    <td height="20" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;">&nbsp;</td>
                                                </tr>
                                                <!-- Spacing -->
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- End of Header -->
        <!-- Start Full Text -->
        <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="full-text">
            <tbody>
                <tr>
                    <td>
                        <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                            <tbody>
                                <tr>
                                    <td width="100%">
                                        <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                                            <tbody>
                                                <!-- Spacing -->
                                                <tr>
                                                    <td height="20" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;">&nbsp;</td>
                                                </tr>
                                                <!-- Spacing -->
                                                <tr>
                                                    <td>
                                                        <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner">
                                                            <tbody>
                                                                <!-- Title -->
                                                                <tr>
                                                                    <td style="font-family: Open Sans, Helvetica, arial, sans-serif; font-size: 28px; font-weight:400; color: #666; text-align:center; line-height: 28px;" st-title="fulltext-heading">
                                                                        Olá ` + user.firstName + ` ` + user.lastName + `
                                                                    </td>
                                                                </tr>
                                                                <!-- End of Title -->
                                                                <!-- content -->
                                                                <tr>
                                                                    <td style="font-family: 'Open Sans', Helvetica, arial, sans-serif; font-size: 14px; color: #666666; text-align:center; line-height: 30px; " st-content="fulltext-content">
                                                                        <p style="font-family: Open Sans, Helvetica, arial, sans-serif; font-size: 16px; font-weight:400; color: #666; text-align:center; line-height: 28px;">
                                                                        <u>Iremos alterar sua senha esquecida</u> <br>
                                                                        Para isto, utilize o botão abaixo, que te redirecionará para nosso sistema. Lá, você poderá escolher uma nova senha para ter acesso ao sistema novamente.
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td height="20px">
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="font-family: 'Open Sans', Helvetica, arial, sans-serif; font-size: 14px; color: #666666; text-align:center; height:50px; vertical-align:center" st-content="fulltext-content">
                                                                        <a style="width:300px; background-color: #fff!important; border:1px solid #86AF49; color: #86AF49; display: block; font-size: 16px; margin: 0 auto; padding:20px 0; height:20px;" href="http://app.getokr.com/#/password/forgot/` + user.password_token.token + `">Clique aqui para alterar a senha esquecida</a>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td height="20px">
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="font-family: 'Open Sans', Helvetica, arial, sans-serif; font-size: 14px; color: #666666; text-align:center; line-height: 30px; " st-content="fulltext-content">
                                                                        <p style="margin-top: 0!important; font-family: Open Sans, Helvetica, arial, sans-serif; font-size: 16px; font-weight:400; color: #666; text-align:center; line-height: 28px;">Se você tiver quaisquer perguntas ou comentários, envie e-mail para contato@linkapi.com</p>
                                                                    </td>
                                                                </tr>
                                                                <!-- End of content -->
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- end of full text -->
        <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="seperator">
            <tbody>
                <tr>
                    <td>
                        <table width="600" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidth">
                            <tbody>
                                <tr>
                                    <td align="center" height="30" style="font-size:1px; line-height:1px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td width="550" align="center" height="1" bgcolor="#d1d1d1" style="font-size:1px; line-height:1px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center" height="30" style="font-size:1px; line-height:1px;">&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Start of Postfooter -->
        <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="postfooter">
            <tbody>
                <tr>
                    <td>
                        <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                            <tbody>
                                <tr>
                                    <td width="100%">
                                        <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                                            <tbody>
                                                <tr>
                                                <td align="center" valign="middle" style="font-family: Helvetica, arial, sans-serif; font-size: 14px;color: #666666" st-content="postfooter">
                                                    <a href="#" style="text-decoration: none; color: #86AF49!important">getOkr</a>
                                                </td>
                                                </tr>
                                                <!-- Spacing -->
                                                <tr>
                                                    <td width="100%" height="20"></td>
                                                </tr>
                                                <!-- Spacing -->
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- End of postfooter -->
    </body>
    </html>`

    return html
}