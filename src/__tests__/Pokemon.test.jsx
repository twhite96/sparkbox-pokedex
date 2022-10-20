
import React from 'react';
import { render, screen } from '@testing-library/react';
import Pokemon from "../components/Pokemon/Pokemon";

describe('Pokemon', () => {
    test('renders Pokemon component', () => {
        render(<Pokemon />);

        screen.debug();
    });
});