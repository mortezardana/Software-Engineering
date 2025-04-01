const MemberRepository = require('../repository/MemberRepo');  // Assuming this path

class MemberService {
    static async getAllMembers({ page, pageSize, search }) {
        return await MemberRepository.getMembers({ page, pageSize, search });
    }

    static async getMemberById(id) {
        return await MemberRepository.getMemberById(id);
    }

    static async getMemberByUsername(username) {
        return await MemberRepository.getMemberByUsername(username);
    }

    static async getMemberByUsername(username) {
        return await MemberRepository.getMemberByUsername(username);
    }

    static async createMember(data) {
        return await MemberRepository.createMember(data);
    }

    static async updateMember(id, data) {
        return await MemberRepository.updateMember(id, data);
    }

    static async deleteMember(id) {
        return await MemberRepository.deleteMember(id);
    }
}

module.exports = MemberService;
