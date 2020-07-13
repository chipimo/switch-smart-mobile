import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';

const Header = ({ children }) => <Text style={styles.header}>{children}</Text>;

const styles = StyleSheet.create({
  header: {
    fontSize: 36,
    color: "#187271",
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});

export default memo(Header);
