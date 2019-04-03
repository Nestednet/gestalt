// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Image from './Image.js';
import Mask from './Mask.js';

type Props = {|
  name: string,
  onError: () => void,
  profile?: string,
  shape: 'circle' | 'rounded' | 'square',
|};

function DefaultAvatar(props: Props) {
  const { name, profile, shape, onError } = props;
  const src =
    profile === 'user'
      ? 'https://s3-eu-west-1.amazonaws.com/nestednet-images/default-templates/avatars/user_avatar-default.jpg'
      : 'https://s3-eu-west-1.amazonaws.com/nestednet-images/default-templates/avatars/company_avatar-default.jpg';

  return (
    <Mask shape={shape} fit={fit} wash>
      <Image
        alt={name}
        color="#EFEFEF"
        naturalHeight={1}
        naturalWidth={1}
        src={src}
        onError={onError}
      />
    </Mask>
  );
}

DefaultAvatar.propTypes = {
  name: PropTypes.string,
  profile: PropTypes.string,
  shape: PropTypes.string,
  onError: PropTypes.func,
};

type State = {| isImageLoaded: boolean |};

type AvatarProps = {|
  cover?: boolean,
  name: string,
  outline?: boolean,
  size?: 'sm' | 'md' | 'lg',
  src?: string,
  profile?: string,
|};

const sizes = {
  sm: 24,
  md: 40,
  lg: 72,
};

export default class Avatar extends React.PureComponent<AvatarProps, State> {
  static propTypes = {
    cover: PropTypes.bool,
    name: PropTypes.string.isRequired,
    outline: PropTypes.bool,
    src: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    profile: PropTypes.oneOf(['user', 'company']),
  };

  state = {
    isImageLoaded: true,
  };

  handleImageError = () => this.setState({ isImageLoaded: false });

  render() {
    const { cover, name, outline, size, src, profile } = this.props;
    const { isImageLoaded } = this.state;
    const width = size ? sizes[size] : '100%';
    const height = size ? sizes[size] : '';

    const shape = profile === 'user' ? 'circle' : 'square';
    const fit = cover ? 'cover' : 'none';
    return (
      <Box
        color="white"
        {...(outline
          ? {
              dangerouslySetInlineStyle: {
                __style: {
                  boxShadow: '0 0 0 2px #fff',
                },
              },
            }
          : {})}
        width={width}
        height={height}
        position="relative"
        shape={shape}
      >
        {src && isImageLoaded ? (
          <Mask height={height} shape={shape} wash>
            <Image
              alt={name}
              color="#EFEFEF"
              fit={fit}
              naturalHeight={1}
              naturalWidth={1}
              src={src}
              onError={this.handleImageError}
            />
          </Mask>
        ) : (
          <DefaultAvatar
            name={name}
            profile={profile}
            shape={shape}
            onError={this.handleImageError}
          />
        )}
      </Box>
    );
  }
}
