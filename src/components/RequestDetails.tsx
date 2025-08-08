import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { backHandlerSet } from '../backHandler';
import NetworkRequestInfo from '../NetworkRequestInfo';
import { Theme, useThemedStyles } from '../theme';
import Button from './Button';
import Header from './Header';
import ResultItem from './ResultItem';

interface Props {
  request: NetworkRequestInfo;
  onClose(): void;
}

const Collapse: React.FC<{ title: string; children: React.ReactNode | object; isExpanded?: boolean }> = ({ title = 'Headers', children: body, isExpanded = false }) => {
  const styles = useThemedStyles(themedStyles);

  const [s, setS] = useState({ toggle: isExpanded });

  return (
    <View>
      <Header onPress={() => setS(pre => ({ ...pre, toggle: !pre.toggle }))} shareContent={(body && JSON.stringify(body, null, 2)) as any}>
        {title}
      </Header>
      {s.toggle &&
        (typeof body === 'object' ? (
          <View style={styles.content}>
            {Object.entries(body || {}).map(([name, value]) => (
              <View style={styles.headerContainer} key={name}>
                <Text style={styles.headerKey}>{name}: </Text>
                <Text style={styles.headerValue}>{value}</Text>
              </View>
            ))}
          </View>
        ) : Platform.OS === 'ios' && typeof body === 'string' ? (
          <TextInput style={[styles.content, styles.largeContent]} multiline editable={false} value={body} />
        ) : (
          <View style={styles.largeContent}>
            <ScrollView nestedScrollEnabled>
              <View>
                <Text style={styles.content} selectable>
                  {body}
                </Text>
              </View>
            </ScrollView>
          </View>
        ))}
    </View>
  );
};

const RequestDetails: React.FC<Props> = ({ request, onClose }) => {
  const [responseBody, setResponseBody] = useState('Loading...');
  const styles = useThemedStyles(themedStyles);

  useEffect(() => {
    (async () => {
      const body = await request.getResponseBody();
      setResponseBody(body);
    })();
  }, [request]);

  const requestBody = request.getRequestBody(!!request.gqlOperation);

  const getFullRequest = () => {
    let response;
    if (responseBody) {
      try {
        response = JSON.parse(responseBody);
      } catch {
        response = `${responseBody}`;
      }
    }
    const processedRequest = {
      ...request,
      response,
      duration: request.duration,
    };
    return JSON.stringify(processedRequest, null, 2);
  };

  return (
    <View style={styles.container}>
      <ResultItem request={request} style={styles.info} />
      <ScrollView style={styles.scrollView} nestedScrollEnabled>
        <Collapse title="Request Headers" children={request.requestHeaders} />
        <Collapse title="Request Body" children={requestBody} />
        <Collapse title="Response Headers" children={request.responseHeaders} />
        <Collapse title="Response Body" children={responseBody} isExpanded={true} />
        <Button onPress={() => Share.share({ message: getFullRequest() })} fullWidth>
          {'Share full request'}
        </Button>
        <Button onPress={() => Share.share({ message: request.curlRequest })} fullWidth>
          {'Share as cURL'}
        </Button>
      </ScrollView>
      {!backHandlerSet() && (
        <Button onPress={onClose} style={styles.close}>
          {'Close'}
        </Button>
      )}
    </View>
  );
};

const themedStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 10,
    },
    info: {
      margin: 0,
    },
    close: {
      position: 'absolute',
      right: 10,
      top: 0,
    },
    scrollView: {
      width: '100%',
    },
    headerContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    headerKey: { fontWeight: 'bold', color: theme.colors.text },
    headerValue: { color: theme.colors.text },
    text: {
      fontSize: 16,
      color: theme.colors.text,
    },
    content: {
      backgroundColor: theme.colors.card,
      padding: 10,
      color: theme.colors.text,
    },
    largeContent: {
      maxHeight: 300,
    },
  });

export default RequestDetails;
