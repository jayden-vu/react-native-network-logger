/**
 * @see https://prettier.io/docs/configuration
 * @type {import("eslint").Config}
 */
const config = {
    rules: {
        'react-native/no-inline-styles': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/prop-types': 2,
        'react/no-unused-prop-types': 2,
        'react/no-unknown-property': 2,
        'react/jsx-key': [2, { checkFragmentShorthand: true, warnOnDuplicates: true }],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-closing-tag-location': 2,
        'react/jsx-no-undef': 2,
        'react/forbid-prop-types': 2,
        'no-console': 1,
        eqeqeq: 'off',
        'react/no-unstable-nested-components': 'off',
        'react-native/no-unused-styles': 2,
        'react/jsx-uses-react': 2,
    },
}

export default config;