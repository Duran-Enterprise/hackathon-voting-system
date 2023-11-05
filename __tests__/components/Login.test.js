import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import { Login } from '../../components/global/Login';

describe('Login Component', () => {
    it('should render Login component', () => {
        render(<Login />);
        expect(screen.getByText('Login')).toBeDefined();
    });
});
