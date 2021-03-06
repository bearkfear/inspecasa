/* tslint:disable */


/**
 * AUTO-GENERATED FILE @ 2020-06-21 04:27:55 - DO NOT EDIT!
 *
 * This file was automatically generated by schemats v.3.0.3
 * $ schemats generate -c postgres://username:password@localhost/reloaded -t pessoa -s public
 *
 */


    export type id = number;
    export type nome = string | null;
    export type sobrenome = string | null;
    export type email = string;
    export type bio = string | null;
    export type created_at = Date | null;
    export type changed_at = Date | null;
    export type funcao = string | null;
    export type pessoa_tipo = string | null;
    export type uid = string | null;
    export type img_url = string | null;
    export type url_img = string | null;

export interface Pessoa {
    id: id;
    nome: nome;
    sobrenome: sobrenome;
    email: email;
    bio: bio;
    created_at: created_at;
    changed_at: changed_at;
    funcao: funcao;
    pessoa_tipo: pessoa_tipo;
    uid: uid;
    url_img: url_img;

}
