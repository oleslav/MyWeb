import {render, screen} from '@testing-library/react';
import React from 'react';
import Articles from "./articles/Articles";
import Particles from "./particles/Particles";
import Login from "./authentification/Login";

test('articles', () => {
    localStorage.setItem("email", "admin");
    localStorage.setItem("password", "admin");
    let token = "Basic " + btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`);
    console.log(token);
    let articles = new Articles;
    articles.componentDidMount();
    console.log(articles.state);
});

test('authentification good', () => {
    localStorage.setItem("email", "admin");
    localStorage.setItem("password", "admin");
    let token = "Basic " + btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`);
    console.log(token);
    let particles = new Particles;
    particles.componentDidMount();
    console.log(particles.state);
});


test('check closeAlert', () => {
    let obj = new Login;
    obj.closeAlert.bind(obj);
    expect(obj.state.isAlert).toBe(false);
});

test('check', () => {
    let obj = new Articles;
    const string = obj.generate();
    console.log(string);
});