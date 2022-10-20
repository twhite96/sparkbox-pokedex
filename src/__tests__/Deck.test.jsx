import React from 'react';
import { render, screen } from '@testing-library/react';

import Deck from '../components/Deck/Deck';

describe('Deck', () => {
    test('renders Deck component', () => {
        render(<Deck />);
        screen.debug();
    });
});