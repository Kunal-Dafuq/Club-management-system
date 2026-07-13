module.exports = {
  attachments: true,

  pin:true,

  threads:true,

  replies:true,

  membership: {
    include: {
      user: true
    }
  },
  reactions: {
    include: {
      membership: {
        include: {
          user: true
        }
      }
    }
  },
  replyTo: {
    include: {
      membership: {
        include: {
          user: true
        }
      }
    }
  },
  reads: {
    include: {
      membership: {
        include: {
          user: true
        }
      }
    }
  }
};