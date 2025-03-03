import {render} from '@testing-library/react';
import App from './App'
import React from 'react';

describe('Renders App',()=>{
    it('Renders App',()=>{
        render(<App/>)
    })
})